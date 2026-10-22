import { useState, useEffect, useCallback } from 'react';
import {
  getAnkanHondaGoogleReviews,
  ANKAN_HONDA_PLACE_ID,
} from '../services/googleReviews';

export function useGoogleReviews() {
  const [state, setState] = useState({
    loading: true,
    configured: false,
    live: false,
    error: null,
    placeId: ANKAN_HONDA_PLACE_ID,
    businessName: 'Ankan Honda',
    rating: null,
    userRatingCount: 0,
    reviews: [],
    googleMapsUri: '',
    reviewsUri: '',
    writeAReviewUri: '',
  });

  const loadReviews = useCallback(async (forceRefresh = false) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const result = await getAnkanHondaGoogleReviews({ forceRefresh });

    setState({
      loading: false,
      configured: Boolean(result.configured),
      live: Boolean(result.live),
      error: result.error || null,
      errorStatus: result.errorStatus || null,
      placeId: result.placeId || ANKAN_HONDA_PLACE_ID,
      businessName: result.businessName || 'Ankan Honda',
      rating: typeof result.rating === 'number' ? result.rating : null,
      userRatingCount:
        typeof result.userRatingCount === 'number' ? result.userRatingCount : 0,
      reviews: Array.isArray(result.reviews) ? result.reviews : [],
      googleMapsUri: result.googleMapsUri || '',
      reviewsUri: result.reviewsUri || '',
      writeAReviewUri: result.writeAReviewUri || '',
    });
  }, []);

  useEffect(() => {
    loadReviews(false);
  }, [loadReviews]);

  return {
    ...state,
    refreshReviews: () => loadReviews(true),
  };
}
