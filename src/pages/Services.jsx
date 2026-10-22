import React from 'react';
import { Link } from 'react-router-dom';
import {
  Info,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import ServiceCard from '../components/ServiceCard';
import ContactCTA from '../components/ContactCTA';
import { SERVICES_DATA } from '../data/services';
import { DEALERSHIP_CONFIG, WHATSAPP_MESSAGES } from '../config/dealership';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Services() {
  useDocumentMeta({
    title: 'Showroom Services & Enquiry Categories',
    description:
      'Explore customer enquiry categories at Ankan Honda, Batauli: new vehicle sales, periodic maintenance information, genuine spare parts, finance, exchange, and insurance enquiries.',
    path: '/services',
  });

  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  return (
    <div className="page-services">
      {/* Page Banner */}
      <section className="page-banner bg-charcoal text-light">
        <div className="container">
          <span className="section-eyebrow eyebrow-red">
            CUSTOMER ASSISTANCE &amp; INFORMATION
          </span>
          <h1 className="page-banner-title">Dealership Services &amp; Enquiries</h1>
          <p className="page-banner-subtitle">
            Browse the enquiry categories below to connect with{' '}
            <strong>Ankan Honda, Batauli</strong>. Each category prepares a tailored
            message so our showroom team can guide you on current availability,
            required documents, and scheduling.
          </p>
        </div>
      </section>

      {/* Distinction Notice Banner */}
      <section className="services-notice-bar bg-white">
        <div className="container">
          <div className="services-info-alert">
            <Info size={22} className="text-red" />
            <div>
              <h2>Information &amp; Enquiry Portal Notice</h2>
              <p>
                This page provides information on customer enquiry categories and does
                not represent an automated workshop booking system. Specific service
                availability, workshop timings, spare parts inventory, and third-party
                finance or insurance options must be confirmed directly with the Batauli
                showroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Cards Grid */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          <div className="services-grid services-grid-detailed">
            {SERVICES_DATA.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                detailed={true}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How to Prepare for Your Showroom Enquiry */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="services-process-grid">
            <div className="services-process-content">
              <span className="section-eyebrow">SMOOTH SHOWROOM EXPERIENCE</span>
              <h2 className="section-title">
                How to Get the Fastest Assistance
              </h2>
              <p className="section-subtitle">
                Whether you are enquiring about a new Honda two-wheeler or asking about
                maintenance and parts in Batauli, keeping a few details handy helps our
                team respond accurately.
              </p>

              <div className="process-steps-list">
                <div className="process-step-item">
                  <div className="process-step-num">01</div>
                  <div>
                    <h3>Select Your Enquiry Category</h3>
                    <p>
                      Click the relevant &ldquo;Enquire&rdquo; button above to open a
                      pre-formatted WhatsApp message tailored to your topic.
                    </p>
                  </div>
                </div>

                <div className="process-step-item">
                  <div className="process-step-num">02</div>
                  <div>
                    <h3>Share Model or Registration Details</h3>
                    <p>
                      For new vehicles, mention your preferred model and variant. For
                      parts, maintenance, or insurance enquiries, include your vehicle
                      model name and manufacturing year.
                    </p>
                  </div>
                </div>

                <div className="process-step-item">
                  <div className="process-step-num">03</div>
                  <div>
                    <h3>Confirm Timings Before Visiting</h3>
                    <p>
                      Wait for our Batauli showroom team to confirm current stock or
                      recommended visiting hours so your trip is convenient.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="services-checklist-card">
              <span className="welcome-card-tag">HELPFUL CHECKLIST</span>
              <h3>Documents Commonly Requested at the Showroom</h3>
              <p>
                Depending on the nature of your visit, having original documents ready
                can simplify in-person assistance:
              </p>
              <ul className="doc-checklist">
                <li>
                  <CheckCircle size={17} className="text-red" />
                  <span>
                    <strong>Test Rides:</strong> Valid original Indian two-wheeler
                    Driving Licence.
                  </span>
                </li>
                <li>
                  <CheckCircle size={17} className="text-red" />
                  <span>
                    <strong>New Vehicle Registration / Finance Enquiries:</strong>{' '}
                    Identity proof, local address proof, and passport-size photographs
                    (confirm exact list with showroom).
                  </span>
                </li>
                <li>
                  <CheckCircle size={17} className="text-red" />
                  <span>
                    <strong>Maintenance / Parts / Insurance Enquiries:</strong>{' '}
                    Registration Certificate (RC), service book, and previous insurance
                    policy copy.
                  </span>
                </li>
              </ul>

              <div className="checklist-actions showroom-visit-actions">
                <button
                  type="button"
                  className="btn btn-whatsapp showroom-visit-action"
                  onClick={() =>
                    triggerWhatsAppEnquiry({
                      title: 'General Service & Document Enquiry',
                      subtitle:
                        'Ask Ankan Honda, Batauli about required documents or showroom timings.',
                      messageText: WHATSAPP_MESSAGES.generalEnquiry(),
                    })
                  }
                >
                  <WhatsAppIcon size={18} />
                  <span>Ask Showroom on WhatsApp</span>
                </button>
                <Link to="/contact" className="btn btn-outline-light showroom-visit-action">
                  <MapPin size={18} />
                  <span>Contact Showroom</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
