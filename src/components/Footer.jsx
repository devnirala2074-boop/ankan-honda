import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Instagram,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  DEALERSHIP_CONFIG,
  isPhoneConfigured,
  WHATSAPP_MESSAGES,
} from '../config/dealership';
import { VEHICLES } from '../data/vehicles';
import { SERVICES_DATA } from '../data/services';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Footer() {
  const { triggerWhatsAppEnquiry } = useEnquiryModal();
  const currentYear = new Date().getFullYear();

  const handleFooterWhatsApp = () => {
    triggerWhatsAppEnquiry({
      title: 'WhatsApp Enquiry — Ankan Honda, Batauli',
      subtitle:
        'Send a general enquiry to the Batauli dealership regarding vehicles, services, or showroom timings.',
      messageText: WHATSAPP_MESSAGES.generalEnquiry(),
    });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Dealership Brand & Overview */}
          <div className="footer-col footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="brand-emblem" aria-hidden="true">
                <span className="brand-wing">H</span>
              </div>
              <div className="brand-text-group">
                <span className="brand-title footer-brand-title">
                  ANKAN <span className="brand-honda">HONDA</span>
                </span>
                <span className="brand-subtitle">BATAULI • CHHATTISGARH</span>
              </div>
            </Link>
            <p className="footer-description">
              Discover Honda motorcycles and scooters in Batauli, Surguja District,
              Chhattisgarh. Explore our illustrative vehicle catalogue, submit test ride
              requests, and connect with our showroom for personalised assistance.
            </p>
            <div className="footer-social-buttons">
              <button
                type="button"
                className="btn btn-whatsapp footer-social-button"
                onClick={handleFooterWhatsApp}
              >
                <WhatsAppIcon size={20} />
                <span>WhatsApp Showroom</span>
              </button>
              <a
                href={DEALERSHIP_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light footer-social-button"
              >
                <MapPin size={20} />
                <span>Google Maps</span>
              </a>
              <a
                href="https://www.instagram.com/ankan_honda_batauli_/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-instagram footer-social-button"
              >
                <Instagram size={20} />
                <span>Follow Us on Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Navigation</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <ChevronRight size={14} /> Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles">
                  <ChevronRight size={14} /> Bikes &amp; Scooters
                </Link>
              </li>
              <li>
                <Link to="/test-ride">
                  <ChevronRight size={14} /> Request a Test Ride
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <ChevronRight size={14} /> Showroom Services
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <ChevronRight size={14} /> About Ankan Honda
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  <ChevronRight size={14} /> Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <ChevronRight size={14} /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Vehicle Catalogue */}
          <div className="footer-col">
            <h3 className="footer-heading">Honda Catalogue</h3>
            <ul className="footer-links">
              {VEHICLES.slice(0, 6).map((vehicle) => (
                <li key={vehicle.id}>
                  <Link to={`/vehicles/${vehicle.slug}`}>
                    <ChevronRight size={14} /> {vehicle.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/vehicles" className="footer-view-all-link">
                  View Full Catalogue &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Services & Showroom Contact Placeholders */}
          <div className="footer-col">
            <h3 className="footer-heading">Showroom &amp; Enquiries</h3>
            <ul className="footer-links footer-services-sublist">
              {SERVICES_DATA.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link to="/services">
                    <ChevronRight size={14} /> {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="footer-contact-cards">
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <div>
                  <strong>Location:</strong>
                  <span>
                    {DEALERSHIP_CONFIG.city}, {DEALERSHIP_CONFIG.district},{' '}
                    {DEALERSHIP_CONFIG.state} ({DEALERSHIP_CONFIG.address.pinCode})
                  </span>
                  <small className="footer-placeholder-tag">
                    {DEALERSHIP_CONFIG.address.line1}
                  </small>
                </div>
              </div>

              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <div>
                  <strong>Telephone:</strong>
                  {isPhoneConfigured() ? (
                    <a href={`tel:${DEALERSHIP_CONFIG.contact.phone}`}>
                      {DEALERSHIP_CONFIG.contact.phone}
                    </a>
                  ) : (
                    <span className="footer-placeholder-tag">
                      {DEALERSHIP_CONFIG.contact.phoneDisplay}
                    </span>
                  )}
                </div>
              </div>

              <div className="footer-contact-item">
                <Clock size={16} className="footer-contact-icon" />
                <div>
                  <strong>Showroom Hours:</strong>
                  <span className="footer-placeholder-tag">
                    {DEALERSHIP_CONFIG.openingHours.schedule}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            <strong>Catalogue &amp; Enquiry Disclaimer:</strong>{' '}
            {DEALERSHIP_CONFIG.disclaimers.catalogueNote}
          </p>
          <div className="footer-copyright-row">
            <p>
              &copy; {currentYear} {DEALERSHIP_CONFIG.name}, {DEALERSHIP_CONFIG.city},{' '}
              {DEALERSHIP_CONFIG.state}. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/vehicles">Catalogue</Link>
              <span aria-hidden="true">•</span>
              <Link to="/test-ride">Test Ride</Link>
              <span aria-hidden="true">•</span>
              <Link to="/contact">Contact Showroom</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
