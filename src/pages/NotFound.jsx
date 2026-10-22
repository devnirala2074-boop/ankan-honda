import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, PhoneCall } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({
    title: 'Page Not Found (404)',
    description:
      'The page you are looking for could not be found on the Ankan Honda Batauli website.',
    path: '/404',
  });

  return (
    <section className="section-padding bg-light-gray">
      <div className="container">
        <div className="not-found-card">
          <span className="not-found-code">404</span>
          <h1>Page Not Found</h1>
          <p>
            The page you requested does not exist or may have been moved. Use the links
            below to return to the Ankan Honda homepage or explore our two-wheeler
            catalogue.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={17} />
              <span>Return to Homepage</span>
            </Link>
            <Link to="/vehicles" className="btn btn-outline-dark">
              <Compass size={17} />
              <span>Browse Bikes &amp; Scooters</span>
            </Link>
            <Link to="/contact" className="btn btn-outline-dark">
              <PhoneCall size={17} />
              <span>Contact Showroom</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
