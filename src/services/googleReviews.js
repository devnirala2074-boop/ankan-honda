import { DEALERSHIP_CONFIG } from '../config/dealership';

/**
 * Official Google Place ID for Ankan Honda, Batauli, Surguja, Chhattisgarh, India
 */
export const ANKAN_HONDA_PLACE_ID =
  DEALERSHIP_CONFIG.googleBusiness?.placeId || 'ChIJdYLqtemRiTkRUi6ZhdHVgh0';

const SESSION_CACHE_KEY = `ankan_honda_places_new_${ANKAN_HONDA_PLACE_ID}`;
const SESSION_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes session cache

const PLACES_NEW_FIELD_MASK = [
  'id',
  'displayName',
  'rating',
  'userRatingCount',
  'reviews',
  'googleMapsUri',
  'googleMapsLinks',
].join(',');

function readSessionCache() {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      parsed.timestamp &&
      Date.now() - parsed.timestamp < SESSION_CACHE_TTL_MS &&
      parsed.data?.live
    ) {
      return parsed.data;
    }
    sessionStorage.removeItem(SESSION_CACHE_KEY);
  } catch {
    // Ignore storage errors
  }
  return null;
}

function writeSessionCache(data) {
  try {
    if (data?.live) {
      sessionStorage.setItem(
        SESSION_CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data })
      );
    }
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Fetches authentic Google Business reviews for Ankan Honda (`ChIJdYLqtemRiTkRUi6ZhdHVgh0`)
 * using the official Google Places API (New) Place Details endpoint.
 *
 * Integration hierarchy:
 * 1. Calls `/api/google-reviews` (server-side proxy using `GOOGLE_PLACES_API_KEY`).
 * 2. If server key is not set and a domain-restricted `VITE_GOOGLE_PLACES_API_KEY`
 *    is provided for static hosting, queries `https://places.googleapis.com/v1/places/{placeId}`.
 * 3. If no API key is configured, returns `{ configured: false, live: false, placeId }`
 *    so the UI renders an honest configuration state without fake reviews.
 */
export async function getAnkanHondaGoogleReviews({ forceRefresh = false } = {}) {
  if (!forceRefresh) {
    const cached = readSessionCache();
    if (cached) {
      return { ...cached, fromSessionCache: true };
    }
  }

  // Step 1: Attempt server-side proxy (/api/google-reviews)
  try {
    const proxyRes = await fetch('/api/google-reviews', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const contentType = proxyRes.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const proxyData = await proxyRes.json();

      if (proxyData.live) {
        writeSessionCache(proxyData);
        return proxyData;
      }

      // If server key WAS configured but Google returned an API error (e.g. invalid key / billing)
      if (proxyData.configured && proxyData.error) {
        return proxyData;
      }
    }
  } catch {
    // Server proxy unavailable (e.g., pure static hosting); check optional restricted client key
  }

  // Step 2: Optional fallback for static-only hosting with HTTP-referrer-restricted key
  const restrictedClientKey = (
    import.meta.env.VITE_GOOGLE_PLACES_API_KEY || ''
  ).trim();

  if (restrictedClientKey) {
    try {
      const endpoint = `https://places.googleapis.com/v1/places/${encodeURIComponent(
        ANKAN_HONDA_PLACE_ID
      )}?languageCode=en`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': restrictedClientKey,
          'X-Goog-FieldMask': PLACES_NEW_FIELD_MASK,
        },
      });

      const rawData = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          configured: true,
          live: false,
          placeId: ANKAN_HONDA_PLACE_ID,
          error:
            rawData?.error?.message ||
            `Google Places API (New) returned HTTP ${response.status}`,
          errorStatus: rawData?.error?.status || 'API_ERROR',
        };
      }

      const normalized = {
        configured: true,
        live: true,
        placeId: rawData.id || ANKAN_HONDA_PLACE_ID,
        businessName: rawData.displayName?.text || 'Ankan Honda',
        rating: typeof rawData.rating === 'number' ? rawData.rating : null,
        userRatingCount:
          typeof rawData.userRatingCount === 'number'
            ? rawData.userRatingCount
            : 0,
        googleMapsUri:
          rawData.googleMapsUri || DEALERSHIP_CONFIG.googleBusiness.placeUrl,
        reviewsUri:
          rawData.googleMapsLinks?.reviewsUri ||
          DEALERSHIP_CONFIG.googleBusiness.viewReviewsUrl,
        writeAReviewUri:
          rawData.googleMapsLinks?.writeAReviewUri ||
          DEALERSHIP_CONFIG.googleBusiness.writeReviewUrl,
        reviews: Array.isArray(rawData.reviews)
          ? rawData.reviews.map((rev) => ({
              name: rev.name || '',
              rating: typeof rev.rating === 'number' ? rev.rating : null,
              text: rev.text?.text || rev.originalText?.text || '',
              relativePublishTimeDescription:
                rev.relativePublishTimeDescription || '',
              publishTime: rev.publishTime || '',
              googleMapsUri: rev.googleMapsUri || '',
              authorAttribution: {
                displayName:
                  rev.authorAttribution?.displayName || 'Google Reviewer',
                uri: rev.authorAttribution?.uri || '',
                photoUri: rev.authorAttribution?.photoUri || '',
              },
            }))
          : [],
      };

      writeSessionCache(normalized);
      return normalized;
    } catch (err) {
      return {
        configured: true,
        live: false,
        placeId: ANKAN_HONDA_PLACE_ID,
        error:
          err?.message ||
          'Network error while requesting Google Places API (New).',
      };
    }
  }

  // Step 3: Neither server key nor client key is configured yet
  return {
    configured: false,
    live: false,
    placeId: ANKAN_HONDA_PLACE_ID,
    businessName: DEALERSHIP_CONFIG.googleBusiness.businessName,
    googleMapsUri: DEALERSHIP_CONFIG.googleBusiness.placeUrl,
    reviewsUri: DEALERSHIP_CONFIG.googleBusiness.viewReviewsUrl,
    writeAReviewUri: DEALERSHIP_CONFIG.googleBusiness.writeReviewUrl,
  };
}
