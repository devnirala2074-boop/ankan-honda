import React, { useState } from 'react';
import {
  ExternalLink,
  PenSquare,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  MapPin,
} from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../config/dealership';
import { useGoogleReviews } from '../hooks/useGoogleReviews';

/**
 * Official 4-Color Google "G" Logo SVG for Google Maps Platform Attribution
 */
function GoogleGLogo({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="google-g-svg"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/**
 * Star Visualization Component (Supports fractional fill for aggregate rating
 * and integer fill for individual review ratings)
 */
function StarVisualization({ rating = 0, size = 18 }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div
      className="google-stars-row"
      role="img"
      aria-label={`Rated ${safeRating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillFraction = Math.max(0, Math.min(1, safeRating - (starIndex - 1)));
        const fillPercent = Math.round(fillFraction * 100);
        const gradId = `star-grad-${starIndex}-${Math.round(safeRating * 100)}-${size}`;

        return (
          <svg
            key={starIndex}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="google-star-svg"
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fillPercent}%`} stopColor="#FBBC04" />
                <stop offset={`${fillPercent}%`} stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradId})`}
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      })}
    </div>
  );
}

/**
 * Individual Google Review Card with Mandatory Author Attribution
 */
function GoogleReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const authorName = review.authorAttribution?.displayName || 'Google User';
  const authorUri = review.authorAttribution?.uri || '';
  const photoUri = review.authorAttribution?.photoUri || '';
  const reviewText = review.text || '';
  const isLong = reviewText.length > 220;
  const displayedText =
    !expanded && isLong ? `${reviewText.slice(0, 220).trim()}…` : reviewText;

  // Format fallback date if relativePublishTimeDescription is absent
  let formattedDate = review.relativePublishTimeDescription || '';
  if (!formattedDate && review.publishTime) {
    try {
      formattedDate = new Date(review.publishTime).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      formattedDate = '';
    }
  }

  const initials = authorName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <article className="google-review-card">
      <div className="google-review-card-top">
        <div className="reviewer-identity">
          {photoUri && !avatarError ? (
            <img
              src={photoUri}
              alt={authorName}
              className="reviewer-avatar-img"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setAvatarError(true)}
            />
          ) : (
            <div className="reviewer-avatar-fallback" aria-hidden="true">
              {initials || 'G'}
            </div>
          )}

          <div className="reviewer-meta">
            {authorUri ? (
              <a
                href={authorUri}
                target="_blank"
                rel="noopener noreferrer"
                className="reviewer-name-link"
              >
                {authorName}
              </a>
            ) : (
              <span className="reviewer-name-text">{authorName}</span>
            )}
            {formattedDate && (
              <span className="review-publish-date">{formattedDate}</span>
            )}
          </div>
        </div>

        <div className="review-google-badge" title="Posted on Google">
          <GoogleGLogo size={18} />
        </div>
      </div>

      {typeof review.rating === 'number' && (
        <div className="google-review-stars-wrap">
          <StarVisualization rating={review.rating} size={16} />
          <span className="review-numeric-badge">{review.rating.toFixed(1)}</span>
        </div>
      )}

      {reviewText ? (
        <div className="google-review-body">
          <p className="google-review-text">{displayedText}</p>
          {isLong && (
            <button
              type="button"
              className="review-expand-btn"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? 'Show less' : 'Read full review'}
            </button>
          )}
        </div>
      ) : (
        <p className="google-review-no-text">
          <em>Star rating submitted on Google Maps without written comment.</em>
        </p>
      )}

      <div className="google-review-card-footer">
        <span className="posted-on-google-label">Posted on Google</span>
        {review.googleMapsUri && (
          <a
            href={review.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="review-source-link"
          >
            <span>View on Google</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Main Google Reviews Section for Ankan Honda (Place ID: ChIJdYLqtemRiTkRUi6ZhdHVgh0)
 */
export default function GoogleReviewsSection() {
  const {
    loading,
    configured,
    live,
    error,
    placeId,
    businessName,
    rating,
    userRatingCount,
    reviews,
    reviewsUri,
    writeAReviewUri,
    refreshReviews,
  } = useGoogleReviews();

  const viewAllUrl =
    reviewsUri || DEALERSHIP_CONFIG.googleBusiness.viewReviewsUrl;
  const writeReviewUrl =
    writeAReviewUri || DEALERSHIP_CONFIG.googleBusiness.writeReviewUrl;

  return (
    <section
      className="section-padding bg-light-gray google-reviews-section"
      aria-labelledby="google-reviews-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">
              GOOGLE BUSINESS PROFILE • VERIFIED PLACE ID
            </span>
            <h2 id="google-reviews-heading" className="section-title">
              Customer Reviews on Google
            </h2>
            <p className="section-subtitle">
              Authentic customer ratings and reviews for{' '}
              <strong>{DEALERSHIP_CONFIG.googleBusiness.businessName}</strong> in{' '}
              {DEALERSHIP_CONFIG.googleBusiness.locationLabel}.
            </p>
          </div>

          {/* Primary Google Review Action Buttons */}
          <div className="google-header-cta-group">
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <PenSquare size={16} />
              <span>Write a Review</span>
            </a>
            <a
              href={viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
            >
              <GoogleGLogo size={16} />
              <span>View All Reviews on Google</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* 1. LOADING STATE */}
        {loading && (
          <div className="google-reviews-loading" role="status" aria-live="polite">
            <div className="google-summary-skeleton" />
            <div className="google-reviews-grid">
              {[1, 2, 3].map((n) => (
                <div key={n} className="google-card-skeleton" />
              ))}
            </div>
          </div>
        )}

        {/* 2. LIVE REVIEWS STATE (Official Places API (New) Response Succeeded) */}
        {!loading && live && (
          <>
            {/* Live Aggregate Rating Banner */}
            <div className="google-live-summary-bar">
              <div className="google-summary-left">
                <div className="google-brand-pill">
                  <GoogleGLogo size={24} />
                  <div>
                    <span className="google-summary-biz-name">{businessName}</span>
                    <span className="google-summary-location">
                      <MapPin size={12} />
                      Batauli, Surguja, Chhattisgarh
                    </span>
                  </div>
                </div>

                <div className="google-rating-score-block">
                  <span className="google-big-rating">
                    {typeof rating === 'number' ? rating.toFixed(1) : '—'}
                  </span>
                  <div className="google-stars-and-count">
                    {typeof rating === 'number' && (
                      <StarVisualization rating={rating} size={20} />
                    )}
                    <span className="google-total-reviews-count">
                      {userRatingCount > 0
                        ? `Based on ${userRatingCount.toLocaleString('en-IN')} Google ${
                            userRatingCount === 1 ? 'review' : 'reviews'
                          }`
                        : 'Verified Google Business Profile'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="google-summary-right">
                <span className="google-live-verified-pill">
                  <CheckCircle2 size={14} />
                  <span>Live via Google Places API (New)</span>
                </span>
                <div className="google-summary-buttons">
                  <a
                    href={writeReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <PenSquare size={14} />
                    <span>Write a Review</span>
                  </a>
                  <a
                    href={viewAllUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm"
                  >
                    <span>View All on Google</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Individual Review Cards Grid */}
            {reviews.length > 0 ? (
              <div className="google-reviews-grid">
                {reviews.map((review, index) => (
                  <GoogleReviewCard
                    key={review.name || `google-review-${index}`}
                    review={review}
                  />
                ))}
              </div>
            ) : (
              <div className="google-empty-reviews-card">
                <p>
                  No written review excerpts were returned by Google for this profile
                  yet. Click below to view the profile on Google Maps or share the
                  first review!
                </p>
              </div>
            )}

            {/* Mandatory Google Maps Platform Attribution Footer */}
            <div className="google-attribution-footer">
              <div className="powered-by-google-badge">
                <GoogleGLogo size={16} />
                <span>Powered by Google</span>
              </div>
              <p className="google-attribution-note">
                Reviews are retrieved directly from the official Google Places API
                (New) for Place ID <code>{placeId}</code> and are not edited or
                filtered by Ankan Honda.
              </p>
            </div>
          </>
        )}

        {/* 3. API KEY NOT CONFIGURED OR API ERROR STATE */}
        {!loading && !live && (
          <div className="google-config-state-card" role="region" aria-label="Google Reviews Integration Status">
            <div className="google-config-top">
              <div className="google-config-brand-row">
                <div className="google-config-icon-wrap">
                  <GoogleGLogo size={28} />
                </div>
                <div>
                  <div className="google-config-badges">
                    <span className="place-id-pill">
                      Place ID: <code>{placeId}</code>
                    </span>
                    <span className="api-status-pill">
                      {configured
                        ? 'API Request Needs Attention'
                        : 'API Key Setup Required for Live Feed'}
                    </span>
                  </div>
                  <h3 className="google-config-title">
                    {DEALERSHIP_CONFIG.googleBusiness.businessName} —{' '}
                    {DEALERSHIP_CONFIG.googleBusiness.locationLabel}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={refreshReviews}
                title="Test Google Places API (New) connection"
              >
                <RefreshCw size={14} />
                <span>Check Connection</span>
              </button>
            </div>

            {configured && error ? (
              <div className="google-api-error-alert" role="alert">
                <AlertCircle size={18} className="google-alert-icon" />
                <div>
                  <strong>Google Places API (New) Response Notice</strong>
                  <p>{error}</p>
                  <small>
                    Ensure that <strong>Places API (New)</strong> is enabled on your
                    Google Cloud project and your API key restrictions permit{' '}
                    <code>places.googleapis.com</code>.
                  </small>
                </div>
              </div>
            ) : (
              <div className="google-setup-instructions-box">
                <div className="setup-box-header">
                  <KeyRound size={17} className="text-red" />
                  <strong>
                    Official Google Places API (New) Integration Ready — Awaiting API
                    Key
                  </strong>
                </div>
                <p className="setup-box-desc">
                  In accordance with strict truthfulness guidelines, no synthetic star
                  ratings or fabricated reviews are displayed while the API key is
                  unconfigured. This component is wired to the official{' '}
                  <strong>Google Places API (New) Place Details</strong> endpoint (
                  <code>
                    GET https://places.googleapis.com/v1/places/{placeId}
                  </code>
                  ) via our secure server proxy (<code>/api/google-reviews</code>).
                </p>
                <ol className="setup-steps-compact">
                  <li>
                    Copy <code>.env.example</code> to <code>.env</code> in the project
                    root.
                  </li>
                  <li>
                    Enable <strong>Places API (New)</strong> in Google Cloud Console
                    and set <code>GOOGLE_PLACES_API_KEY=your_restricted_key</code>.
                  </li>
                  <li>
                    Click <strong>Check Connection</strong> above (or refresh) to
                    display live Google rating, review count, and reviewer cards.
                  </li>
                </ol>
              </div>
            )}

            <div className="google-config-footer-actions">
              <div className="powered-by-google-badge">
                <GoogleGLogo size={16} />
                <span>Verified Google Business Profile Links</span>
              </div>

              <div className="google-direct-cta-row">
                <a
                  href={viewAllUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                >
                  <GoogleGLogo size={16} />
                  <span>View All Reviews on Google</span>
                  <ExternalLink size={15} />
                </a>
                <a
                  href={writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <PenSquare size={16} />
                  <span>Write a Review</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
