import { useEffect } from 'react';
import { DEALERSHIP_CONFIG } from '../config/dealership';

/**
 * Updates document title, meta description, Open Graph tags, and canonical URL
 * for each public route to ensure strong SEO and accessibility.
 */
export function useDocumentMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${DEALERSHIP_CONFIG.name}, ${DEALERSHIP_CONFIG.city}`
      : `${DEALERSHIP_CONFIG.name} | Honda Two-Wheeler Dealership in ${DEALERSHIP_CONFIG.city}, ${DEALERSHIP_CONFIG.state}`;

    document.title = fullTitle;

    const metaDesc =
      description ||
      'Explore Honda motorcycles and scooters with Ankan Honda in Batauli, Chhattisgarh. Enquire about vehicles, request a test ride, and contact our showroom.';

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', metaDesc);
    }

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute('content', fullTitle);
    }

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) {
      ogDescEl.setAttribute('content', metaDesc);
    }

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      canonicalEl.setAttribute(
        'href',
        `${DEALERSHIP_CONFIG.canonicalBaseUrl}${normalizedPath}`
      );
    }
  }, [title, description, path]);
}
