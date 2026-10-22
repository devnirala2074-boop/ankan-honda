import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Users,
  CalendarCheck,
  Wrench,
  Shield,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Info,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import Hero from '../components/Hero';
import VehicleCard from '../components/VehicleCard';
import ServiceCard from '../components/ServiceCard';
import GoogleReviewsSection from '../components/GoogleReviewsSection';
import ContactCTA from '../components/ContactCTA';
import { getFeaturedVehicles } from '../data/vehicles';
import { SERVICES_DATA, WHY_CHOOSE_ITEMS } from '../data/services';
import {
  DEALERSHIP_CONFIG,
  isPhoneConfigured,
  WHATSAPP_MESSAGES,
} from '../config/dealership';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const WHY_ICON_MAP = {
  Compass,
  Users,
  CalendarCheck,
  Wrench,
  Shield,
  MapPin,
};

export default function Home() {
  useDocumentMeta({
    title: 'Honda Two-Wheeler Dealership in Batauli, Chhattisgarh',
    description:
      'Discover Honda motorcycles and scooters with Ankan Honda, Batauli. Explore models like Activa, SP 125, Shine 125, Unicorn, and Dio, and request a test ride.',
    path: '/',
  });

  const featuredVehicles = getFeaturedVehicles(5);
  const shouldReduceMotion = useReducedMotion();
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  return (
    <div className="page-home">
      {/* C. Hero Section */}
      <Hero />

      {/* D. Featured Vehicles Showcase */}
      <section className="section-padding bg-white" aria-labelledby="featured-vehicles-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">ILLUSTRATIVE MODEL CATALOGUE</span>
              <h2 id="featured-vehicles-heading" className="section-title">
                Featured Honda Two-Wheelers
              </h2>
              <p className="section-subtitle">
                Explore popular Honda motorcycles and scooters. Model availability,
                variants, and current Batauli prices are confirmed directly by our
                showroom upon enquiry.
              </p>
            </div>
            <div className="section-header-actions">
              <Link to="/vehicles" className="btn btn-outline-dark">
                <span>View All Models</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="vehicles-grid">
            {featuredVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>

          <div className="catalogue-transparency-banner">
            <Info size={18} className="transparency-icon" />
            <p>
              <strong>Catalogue Guidance Note:</strong> Vehicle cards above are
              presented as illustrative catalogue entries. Please enquire with{' '}
              <strong>Ankan Honda, Batauli</strong> to verify current showroom stock,
              available colour variants, and latest Ex-Showroom / On-Road pricing.
            </p>
          </div>
        </div>
      </section>

      {/* E. Why Choose Ankan Honda? */}
      <section
        className="section-padding bg-charcoal text-light"
        aria-labelledby="why-choose-heading"
      >
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow eyebrow-red">CUSTOMER-FIRST APPROACH</span>
            <h2 id="why-choose-heading" className="section-title text-white">
              Why Connect With Ankan Honda?
            </h2>
            <p className="section-subtitle text-muted-light">
              Our website is designed to make exploring Honda two-wheelers and
              communicating with our Batauli showroom clear, convenient, and
              straightforward.
            </p>
          </div>

          <div className="why-choose-grid">
            {WHY_CHOOSE_ITEMS.map((item, idx) => {
              const IconComp = WHY_ICON_MAP[item.iconName] || Compass;
              return (
                <motion.div
                  key={item.id}
                  className="why-card"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : idx * 0.05,
                  }}
                >
                  <div className="why-card-icon" aria-hidden="true">
                    <IconComp size={22} />
                  </div>
                  <h3 className="why-card-title">{item.title}</h3>
                  <p className="why-card-desc">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* F. Services & Enquiry Categories Section */}
      <section className="section-padding bg-light-gray" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">SHOWROOM ASSISTANCE</span>
              <h2 id="services-heading" className="section-title">
                Dealership Enquiry Categories
              </h2>
              <p className="section-subtitle">
                Select a category below to initiate an enquiry with Ankan Honda. All
                services, finance/insurance options, and workshop schedules are subject
                to confirmation by the showroom.
              </p>
            </div>
            <div className="section-header-actions">
              <Link to="/services" className="btn btn-outline-dark">
                <span>Explore Services Info</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* G. Dealership Introduction ("Welcome to Ankan Honda") */}
      <section className="section-padding bg-white" aria-labelledby="welcome-heading">
        <div className="container">
          <div className="welcome-editorial-grid">
            <div className="welcome-editorial-content">
              <span className="section-eyebrow">SHOWROOM INTRODUCTION</span>
              <h2 id="welcome-heading" className="section-title">
                Welcome to Ankan Honda
              </h2>
              <p className="welcome-lead">
                Located in Batauli, Surguja District, Chhattisgarh, Ankan Honda serves
                local riders and families looking to explore Honda motorcycles and
                scooters.
              </p>
              <p className="welcome-body">
                This digital showroom helps you browse Honda two-wheeler categories,
                understand key model characteristics, prepare structured test ride
                requests, and reach our Batauli team directly via WhatsApp or telephone
                before visiting in person.
              </p>

              <div className="welcome-highlights">
                <div className="welcome-highlight-item">
                  <span className="welcome-highlight-dot" />
                  <div>
                    <strong>Clear Catalogue Browsing</strong>
                    <p>Compare everyday scooters and 100cc–185cc motorcycles side by side.</p>
                  </div>
                </div>
                <div className="welcome-highlight-item">
                  <span className="welcome-highlight-dot" />
                  <div>
                    <strong>Direct Showroom Communication</strong>
                    <p>Send pre-formatted enquiries for price, stock, and test ride schedules.</p>
                  </div>
                </div>
              </div>

              <div className="welcome-cta-row">
                <Link to="/about" className="btn btn-primary">
                  <span>Learn More About Our Showroom</span>
                  <ArrowRight size={17} />
                </Link>
                <Link to="/test-ride" className="btn btn-outline-dark">
                  <span>Request a Test Ride</span>
                </Link>
              </div>
            </div>

            <div className="welcome-editorial-card">
              <div className="welcome-card-inner">
                <span className="welcome-card-tag">BATAULI • SURGUJA • CHHATTISGARH</span>
                <h3>Plan Your Showroom Visit</h3>
                <p>
                  Whether you are comparing the family-friendly Honda Activa with the
                  sporty Dio, or deciding between the Shine 125, SP 125, and Unicorn,
                  our showroom team is here to assist you with accurate, up-to-date
                  local information.
                </p>
                <div className="welcome-card-meta">
                  <div className="welcome-meta-row">
                    <MapPin size={18} className="text-red" />
                    <span>{DEALERSHIP_CONFIG.shortLocation}</span>
                  </div>
                  <div className="welcome-meta-row">
                    <Clock size={18} className="text-red" />
                    <span>{DEALERSHIP_CONFIG.openingHours.schedule}</span>
                  </div>
                </div>
                <div className="welcome-card-actions showroom-visit-actions">
                  <a
                    href={DEALERSHIP_CONFIG.maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light showroom-visit-action"
                  >
                    <MapPin size={18} />
                    <span>Open in Google Maps</span>
                    <ExternalLink size={18} />
                  </a>
                  <button
                    type="button"
                    className="btn btn-whatsapp showroom-visit-action"
                    onClick={() =>
                      triggerWhatsAppEnquiry({
                        title: 'Showroom Visit Enquiry',
                        subtitle:
                          'Confirm showroom timings and vehicle availability before visiting Ankan Honda, Batauli.',
                        messageText: WHATSAPP_MESSAGES.generalEnquiry(),
                      })
                    }
                  >
                    <WhatsAppIcon size={18} />
                    <span>Message Showroom</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. Authentic Google Reviews Section (Places API New — Place ID: ChIJdYLqtemRiTkRUi6ZhdHVgh0) */}
      <GoogleReviewsSection />

      {/* I. Location Section */}
      <section className="section-padding bg-white" aria-labelledby="location-heading">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">VISIT THE SHOWROOM</span>
            <h2 id="location-heading" className="section-title">
              Showroom Location &amp; Contact
            </h2>
            <p className="section-subtitle">
              Find Ankan Honda in Batauli, Chhattisgarh. Contact details below are
              maintained through our central showroom configuration.
            </p>
          </div>

          <div className="location-showcase-grid">
            <div className="location-details-card">
              <div className="location-card-header">
                <span className="location-pill">DEALERSHIP LOCATION</span>
                <h3>{DEALERSHIP_CONFIG.name}</h3>
                <p className="location-sub">{DEALERSHIP_CONFIG.shortLocation}</p>
              </div>

              <div className="location-info-list">
                <div className="location-info-item">
                  <div className="location-info-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4>Showroom Address</h4>
                    <p>
                      {DEALERSHIP_CONFIG.city}, {DEALERSHIP_CONFIG.district},{' '}
                      {DEALERSHIP_CONFIG.state} — {DEALERSHIP_CONFIG.address.pinCode}
                    </p>
                    <span className="placeholder-badge">
                      {DEALERSHIP_CONFIG.address.line1}
                    </span>
                  </div>
                </div>

                <div className="location-info-item">
                  <div className="location-info-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4>Telephone Contact</h4>
                    {isPhoneConfigured() ? (
                      <p>
                        <a
                          href={`tel:${DEALERSHIP_CONFIG.contact.phone}`}
                          className="location-phone-link"
                        >
                          {DEALERSHIP_CONFIG.contact.phone}
                        </a>
                      </p>
                    ) : (
                      <span className="placeholder-badge">
                        {DEALERSHIP_CONFIG.contact.phoneDisplay}
                      </span>
                    )}
                  </div>
                </div>

                <div className="location-info-item">
                  <div className="location-info-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4>Opening Hours</h4>
                    <span className="placeholder-badge">
                      {DEALERSHIP_CONFIG.openingHours.schedule}
                    </span>
                    <p className="location-small-note">
                      {DEALERSHIP_CONFIG.openingHours.daysNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="location-cta-group">
                <a
                  href={DEALERSHIP_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <MapPin size={17} />
                  <span>Get Google Maps Directions</span>
                  <ExternalLink size={15} />
                </a>
                <Link to="/contact" className="btn btn-outline-dark">
                  <span>Open Contact Page</span>
                </Link>
              </div>
            </div>

            {/* Interactive Visual Map Card */}
            <div className="location-map-visual">
              <div className="map-card-overlay">
                <div className="map-pin-graphic" aria-hidden="true">
                  <div className="map-pin-ring" />
                  <div className="map-pin-center">
                    <MapPin size={28} />
                  </div>
                </div>
                <span className="map-region-tag">SURGUJA DISTRICT • CHHATTISGARH</span>
                <h3>Ankan Honda — Batauli</h3>
                <p>
                  Use Google Maps to navigate directly to Batauli, Chhattisgarh or get
                  route directions from Ambikapur, Sitapur, and nearby towns.
                </p>
                <a
                  href={DEALERSHIP_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                >
                  <span>Launch Google Maps Navigation</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* J. Final CTA */}
      <ContactCTA />
    </div>
  );
}
