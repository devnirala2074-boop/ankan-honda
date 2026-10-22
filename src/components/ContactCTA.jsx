import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Calendar } from 'lucide-react';

/**
 * Final Call-To-Action Section ("Find Your Next Ride")
 */
export default function ContactCTA({
  headline = 'Find Your Next Ride',
  subtext = 'Explore Honda two-wheelers or contact Ankan Honda for assistance.',
}) {
  return (
    <section className="final-cta-section" aria-label="Showroom Call to Action">
      <div className="container">
        <div className="final-cta-banner">
          <div className="final-cta-stripe" aria-hidden="true" />
          <div className="final-cta-content">
            <span className="final-cta-eyebrow">ANKAN HONDA • BATAULI, CHHATTISGARH</span>
            <h2 className="final-cta-headline">{headline}</h2>
            <p className="final-cta-subtext">{subtext}</p>
          </div>
          <div className="final-cta-actions">
            <Link to="/vehicles" className="btn btn-primary btn-lg">
              <span>Explore Vehicles</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              <PhoneCall size={18} />
              <span>Contact Showroom</span>
            </Link>
            <Link to="/test-ride" className="btn btn-ghost-light btn-lg">
              <Calendar size={18} />
              <span>Request Test Ride</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
