import React from 'react';
import { ExternalLink, PenSquare, MapPin, Navigation } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../config/dealership';

/**
 * Official 4-Color Google "G" Logo SVG
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
 * Clean, professional Google Business Profile section for Ankan Honda.
 * Links directly to the dealership's official Google Business Profile and review pages
 * without requiring any Google Places API credentials or displaying fabricated reviews.
 */
export default function GoogleReviewsSection() {
  const { businessName, locationLabel, viewReviewsUrl, writeReviewUrl, placeUrl } =
    DEALERSHIP_CONFIG.googleBusiness;

  return (
    <section
      className="section-padding bg-light-gray google-reviews-section"
      aria-labelledby="google-profile-heading"
    >
      <div className="container">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">OFFICIAL GOOGLE LISTING</span>
            <h2 id="google-profile-heading" className="section-title">
              Ankan Honda on Google
            </h2>
            <p className="section-subtitle">
              Visit the official Google Business Profile for{' '}
              <strong>{businessName}</strong> in {locationLabel} to read verified
              customer feedback, share your showroom experience, or navigate to the
              dealership.
            </p>
          </div>

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
              href={viewReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
            >
              <GoogleGLogo size={16} />
              <span>View Reviews on Google</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <div className="google-profile-card">
          <div className="google-profile-card-main">
            <div className="google-profile-brand-row">
              <div className="google-profile-icon-wrap">
                <GoogleGLogo size={30} />
              </div>
              <div className="google-profile-info">
                <span className="google-profile-badge">
                  GOOGLE BUSINESS PROFILE
                </span>
                <h3 className="google-profile-title">{businessName}</h3>
                <p className="google-profile-location">
                  <MapPin size={15} />
                  <span>{locationLabel}</span>
                </p>
              </div>
            </div>

            <p className="google-profile-description">
              We value honest feedback from riders and families across Batauli and
              Surguja District. View customer reviews directly on Google Maps or
              leave a review after visiting our showroom.
            </p>
          </div>

          <div className="google-profile-card-footer">
            <a
              href={placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="google-profile-ext-link"
            >
              <GoogleGLogo size={16} />
              <span>Open Official Google Business Profile</span>
              <ExternalLink size={14} />
            </a>

            <div className="google-profile-actions">
              <a
                href={viewReviewsUrl}
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
              <a
                href={DEALERSHIP_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <Navigation size={16} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
