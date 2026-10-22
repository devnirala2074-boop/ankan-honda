/**
 * Serverless Proxy Endpoint for Google Places API (New) — Place Details
 *
 * Target Business: Ankan Honda, Batauli, Surguja, Chhattisgarh, India
 * Verified Place ID: ChIJdYLqtemRiTkRUi6ZhdHVgh0
 *
 * Official Endpoint (Places API New v1):
 * GET https://places.googleapis.com/v1/places/ChIJdYLqtemRiTkRUi6ZhdHVgh0
 *
 * Security & Compliance:
 * - Keeps `GOOGLE_PLACES_API_KEY` server-side so no unrestricted key is exposed
 *   in public frontend bundles.
 * - Uses a minimal FieldMask (`id,displayName,rating,userRatingCount,reviews,googleMapsUri,googleMapsLinks`)
 *   to minimize latency and Places API SKU cost.
 * - Implements short-term in-memory caching (15 minutes) for performance while
 *   complying with Google Maps Platform caching policies (no permanent storage).
 */

const ANKAN_HONDA_PLACE_ID = 'ChIJdYLqtemRiTkRUi6ZhdHVgh0';
const PLACES_NEW_FIELD_MASK = [
  'id',
  'displayName',
  'rating',
  'userRatingCount',
  'reviews',
  'googleMapsUri',
  'googleMapsLinks',
].join(',');

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes temporary memory cache
let memoryCache = {
  timestamp: 0,
  payload: null,
};

export async function fetchGooglePlaceReviews(apiKey, placeId = ANKAN_HONDA_PLACE_ID) {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) {
    return {
      status: 200,
      body: {
        configured: false,
        live: false,
        placeId,
        message:
          'Google Places API (New) key is not configured yet. Add GOOGLE_PLACES_API_KEY in your .env file to load live Google reviews.',
      },
    };
  }

  const now = Date.now();
  if (memoryCache.payload && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return {
      status: 200,
      body: {
        ...memoryCache.payload,
        cached: true,
      },
    };
  }

  const endpoint = `https://places.googleapis.com/v1/places/${encodeURIComponent(
    placeId
  )}?languageCode=en`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': cleanKey,
        'X-Goog-FieldMask': PLACES_NEW_FIELD_MASK,
      },
    });

    const rawData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const apiErrorMessage =
        rawData?.error?.message ||
        `Google Places API (New) returned HTTP ${response.status}`;
      return {
        status: response.status,
        body: {
          configured: true,
          live: false,
          placeId,
          error: apiErrorMessage,
          errorStatus: rawData?.error?.status || 'API_ERROR',
        },
      };
    }

    // Normalize the official Places API (New) response without altering review content
    const normalizedPayload = {
      configured: true,
      live: true,
      cached: false,
      fetchedAt: new Date().toISOString(),
      placeId: rawData.id || placeId,
      businessName: rawData.displayName?.text || 'Ankan Honda',
      rating: typeof rawData.rating === 'number' ? rawData.rating : null,
      userRatingCount:
        typeof rawData.userRatingCount === 'number' ? rawData.userRatingCount : 0,
      googleMapsUri:
        rawData.googleMapsUri ||
        `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      reviewsUri:
        rawData.googleMapsLinks?.reviewsUri ||
        `https://search.google.com/local/reviews?placeid=${placeId}`,
      writeAReviewUri:
        rawData.googleMapsLinks?.writeAReviewUri ||
        `https://search.google.com/local/writereview?placeid=${placeId}`,
      reviews: Array.isArray(rawData.reviews)
        ? rawData.reviews.map((rev) => ({
            name: rev.name || '',
            rating: typeof rev.rating === 'number' ? rev.rating : null,
            text: rev.text?.text || rev.originalText?.text || '',
            languageCode:
              rev.text?.languageCode || rev.originalText?.languageCode || 'en',
            relativePublishTimeDescription:
              rev.relativePublishTimeDescription || '',
            publishTime: rev.publishTime || '',
            googleMapsUri: rev.googleMapsUri || '',
            authorAttribution: {
              displayName: rev.authorAttribution?.displayName || 'Google User',
              uri: rev.authorAttribution?.uri || '',
              photoUri: rev.authorAttribution?.photoUri || '',
            },
          }))
        : [],
    };

    memoryCache = {
      timestamp: now,
      payload: normalizedPayload,
    };

    return {
      status: 200,
      body: normalizedPayload,
    };
  } catch (err) {
    return {
      status: 502,
      body: {
        configured: true,
        live: false,
        placeId,
        error:
          err?.message ||
          'Unable to reach Google Places API (New) endpoint from server.',
      },
    };
  }
}

/**
 * Default Serverless Handler (Vercel / Node HTTP compatible)
 */
export default async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
  const placeId = process.env.GOOGLE_PLACE_ID || ANKAN_HONDA_PLACE_ID;

  const result = await fetchGooglePlaceReviews(apiKey, placeId);

  res.statusCode = result.status;
  res.setHeader('Content-Type', 'application/json');
  if (result.body.live) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800'
    );
  } else {
    res.setHeader('Cache-Control', 'no-store');
  }
  res.end(JSON.stringify(result.body));
}
