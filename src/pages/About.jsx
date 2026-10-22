import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Compass,
  Users,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Camera,
  Info,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import ContactCTA from '../components/ContactCTA';
import { DEALERSHIP_CONFIG, WHATSAPP_MESSAGES } from '../config/dealership';
import { GALLERY_ITEMS } from '../data/gallery';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function About() {
  useDocumentMeta({
    title: 'About Ankan Honda — Batauli, Chhattisgarh',
    description:
      'Learn about Ankan Honda in Batauli, Surguja District, Chhattisgarh. Discover our customer assistance philosophy, showroom location, and how to connect with us.',
    path: '/about',
  });

  const { triggerWhatsAppEnquiry } = useEnquiryModal();
  const previewVisuals = GALLERY_ITEMS.slice(0, 3);

  return (
    <div className="page-about">
      {/* Page Banner */}
      <section className="page-banner bg-charcoal text-light">
        <div className="container">
          <span className="section-eyebrow eyebrow-red">
            BATAULI • SURGUJA DISTRICT • CHHATTISGARH
          </span>
          <h1 className="page-banner-title">About Ankan Honda</h1>
          <p className="page-banner-subtitle">
            Connecting riders and families in Batauli and surrounding areas of
            Chhattisgarh with Honda motorcycles, scooters, and dedicated showroom
            assistance.
          </p>
        </div>
      </section>

      {/* About Story & Factual Introduction */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <span className="section-eyebrow">OUR SHOWROOM IN BATAULI</span>
              <h2 className="section-title">
                Focused on Clear Information &amp; Personalised Assistance
              </h2>
              <p className="about-lead">
                <strong>Ankan Honda</strong> is a Honda two-wheeler dealership located
                in <strong>Batauli, Surguja District, Chhattisgarh</strong>. Our goal is
                to help customers across Batauli and nearby communities explore Honda
                motorcycles and scooters in a welcoming, straightforward environment.
              </p>
              <p>
                Choosing a two-wheeler is an important decision for daily commuting,
                family errands, agricultural or business travel, and inter-town journeys.
                This website serves as our public digital catalogue and enquiry
                bridge—allowing you to review Honda model categories from home, prepare
                test ride requests, and message our showroom directly for accurate
                availability and on-road pricing.
              </p>

              <div className="about-config-placeholder-box">
                <Info size={18} className="text-red" />
                <div>
                  <strong>Dealership Profile &amp; Milestone Placeholder:</strong>
                  <p>
                    In keeping with our commitment to factual accuracy, specific
                    corporate history details (such as establishment year, management
                    message, and official showroom milestones) are reserved for
                    verified updates by dealership management in{' '}
                    <code>src/config/dealership.js</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-pillars-col">
              <div className="about-pillar-card">
                <div className="about-pillar-icon">
                  <Compass size={22} />
                </div>
                <div>
                  <h3>Transparent Model Discovery</h3>
                  <p>
                    We present clear, illustrative information across Honda’s commuter
                    motorcycles and family scooters while encouraging direct verification
                    of variant specs and local Batauli prices.
                  </p>
                </div>
              </div>

              <div className="about-pillar-card">
                <div className="about-pillar-icon">
                  <Users size={22} />
                </div>
                <div>
                  <h3>Customer Assistance Philosophy</h3>
                  <p>
                    Every rider has different priorities—whether fuel-conscious daily
                    commuting, pillion comfort, or gearless convenience. We focus on
                    answering your questions clearly before and during your showroom
                    visit.
                  </p>
                </div>
              </div>

              <div className="about-pillar-card">
                <div className="about-pillar-icon">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3>Honest Communication</h3>
                  <p>
                    No misleading online booking claims or unverified promotional
                    promises—every online enquiry connects you with our team to confirm
                    real-time showroom status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealership Location Section */}
      <section className="section-padding bg-charcoal text-light">
        <div className="container">
          <div className="about-location-banner">
            <div className="about-location-info">
              <span className="section-eyebrow eyebrow-red">LOCAL ACCESSIBILITY</span>
              <h2 className="section-title text-white">
                Serving Batauli &amp; Surguja District
              </h2>
              <p className="text-muted-light">
                Conveniently situated in Batauli, Chhattisgarh, our showroom is
                accessible to riders from Batauli town as well as surrounding villages
                along the Ambikapur–Sitapur corridor.
              </p>
              <div className="about-location-badges">
                <div className="about-loc-chip">
                  <MapPin size={16} className="text-red" />
                  <span>{DEALERSHIP_CONFIG.shortLocation}</span>
                </div>
                <div className="about-loc-chip">
                  <span>PIN: {DEALERSHIP_CONFIG.address.pinCode}</span>
                </div>
              </div>
            </div>

            <div className="about-location-actions showroom-visit-actions">
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
                    title: 'Connect with Ankan Honda, Batauli',
                    subtitle:
                      'Send a WhatsApp message to our Batauli showroom team.',
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
      </section>

      {/* Showroom & Product Gallery Preview */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">VISUAL SHOWCASE</span>
              <h2 className="section-title">Product &amp; Showroom Gallery</h2>
              <p className="section-subtitle">
                Explore illustrative studio visuals of Honda two-wheelers. Authentic
                photographs of the Batauli showroom premises will be added to the
                Showroom tab as they are supplied.
              </p>
            </div>
            <div className="section-header-actions">
              <Link to="/gallery" className="btn btn-outline-dark">
                <span>Open Full Gallery</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="about-gallery-preview-grid">
            {previewVisuals.map((item) => (
              <div key={item.id} className="about-gallery-card">
                <div className="about-gallery-img-wrap">
                  <span className="gallery-source-pill">{item.sourceBadge}</span>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = item.fallbackSvg;
                    }}
                  />
                </div>
                <div className="about-gallery-caption">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="showroom-photo-placeholder-card">
            <Camera size={24} className="text-red" />
            <div>
              <h3>Actual Batauli Showroom Photographs</h3>
              <p>
                We never use stock or unrelated dealership building photos to represent
                our physical premises. Verified exterior and interior photographs of{' '}
                <strong>Ankan Honda, Batauli</strong> can be added directly to{' '}
                <code>src/data/gallery.js</code> once supplied by the dealership.
              </p>
            </div>
            <Link to="/contact" className="btn btn-outline-dark btn-sm">
              <span>Contact Showroom</span>
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
