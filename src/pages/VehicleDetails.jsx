import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Info,
  Gauge,
  Sliders,
  Fuel,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import VehicleCard from '../components/VehicleCard';
import ContactCTA from '../components/ContactCTA';
import { getVehicleBySlug, getRelatedVehicles } from '../data/vehicles';
import { DEALERSHIP_CONFIG, WHATSAPP_MESSAGES } from '../config/dealership';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function VehicleDetails() {
  const { slug } = useParams();
  const vehicle = getVehicleBySlug(slug);
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  const [imgSrc, setImgSrc] = useState(vehicle ? vehicle.image : '');

  useEffect(() => {
    if (vehicle) {
      setImgSrc(vehicle.image);
    }
  }, [vehicle]);

  useDocumentMeta({
    title: vehicle
      ? `${vehicle.name} (${vehicle.category}) — Overview & Enquiry`
      : 'Vehicle Not Found',
    description: vehicle
      ? `${vehicle.name} at Ankan Honda, Batauli: ${vehicle.shortDescription} Contact the showroom for latest price and availability.`
      : 'The requested vehicle could not be found in the Ankan Honda catalogue.',
    path: vehicle ? `/vehicles/${vehicle.slug}` : '/vehicles',
  });

  if (!vehicle) {
    return (
      <div className="page-vehicle-not-found section-padding bg-light-gray">
        <div className="container">
          <div className="not-found-card">
            <ShieldAlert size={44} className="text-red" />
            <h1>Vehicle Model Not Found</h1>
            <p>
              We couldn&apos;t locate a catalogue entry for the requested URL. You can
              browse all listed Honda motorcycles and scooters or contact Ankan Honda,
              Batauli directly.
            </p>
            <div className="not-found-actions">
              <Link to="/vehicles" className="btn btn-primary">
                <ArrowLeft size={17} />
                <span>Back to Vehicle Catalogue</span>
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                <span>Contact Showroom</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const relatedVehicles = getRelatedVehicles(vehicle.slug, vehicle.category, 3);

  const handleImageError = () => {
    if (imgSrc !== vehicle.fallbackSvg) {
      setImgSrc(
        vehicle.fallbackSvg ||
          (vehicle.category === 'Scooter'
            ? '/images/vehicles/fallback-scooter.svg'
            : '/images/vehicles/fallback-motorcycle.svg')
      );
    }
  };

  const handleVehicleWhatsApp = (customQuestion = '') => {
    const baseMessage = WHATSAPP_MESSAGES.vehicleEnquiry(
      vehicle.name,
      vehicle.category
    );
    const fullMessage = customQuestion
      ? `${baseMessage}\n\nSpecific Question: ${customQuestion}`
      : baseMessage;

    triggerWhatsAppEnquiry({
      title: `Enquire About ${vehicle.name}`,
      subtitle: `Send a direct WhatsApp message to Ankan Honda, Batauli regarding the ${vehicle.name}.`,
      messageText: fullMessage,
    });
  };

  return (
    <div className="page-vehicle-details">
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar bg-charcoal text-light">
        <div className="container breadcrumb-inner">
          <Link to="/vehicles" className="breadcrumb-back">
            <ArrowLeft size={16} />
            <span>Back to Bikes &amp; Scooters</span>
          </Link>
          <div className="breadcrumb-trail" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/vehicles">Catalogue</Link>
            <span>/</span>
            <span className="breadcrumb-current">{vehicle.name}</span>
          </div>
        </div>
      </div>

      {/* Main Vehicle Showcase */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="vehicle-detail-grid">
            {/* Left Column: Studio Image Stage */}
            <div className="vehicle-detail-media-col">
              <div className="vehicle-detail-stage">
                <div className="vehicle-detail-stage-badges">
                  <span
                    className={`vehicle-category-pill ${
                      vehicle.category === 'Scooter'
                        ? 'pill-scooter'
                        : 'pill-motorcycle'
                    }`}
                  >
                    {vehicle.category}
                  </span>
                  <span className="vehicle-segment-pill">{vehicle.segment}</span>
                </div>

                <img
                  src={imgSrc}
                  alt={`${vehicle.name} — Illustrative studio photograph`}
                  className="vehicle-detail-main-img"
                  onError={handleImageError}
                />

                <div className="vehicle-detail-image-footnote">
                  <Info size={14} />
                  <span>
                    Illustrative catalogue image. Actual variant colours, decals, and
                    accessories available at Batauli should be confirmed at the
                    showroom.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Overview, Pricing Notice & Primary CTAs */}
            <div className="vehicle-detail-info-col">
              <span className="section-eyebrow">HONDA TWO-WHEELER CATALOGUE</span>
              <h1 className="vehicle-detail-title">{vehicle.name}</h1>
              <p className="vehicle-detail-lead">{vehicle.shortDescription}</p>

              {/* Key Reference Metrics */}
              <div className="vehicle-key-metrics">
                <div className="key-metric-box">
                  <Gauge size={20} className="text-red" />
                  <div>
                    <span className="metric-label">Engine Class</span>
                    <strong className="metric-value">{vehicle.engineClass}</strong>
                  </div>
                </div>
                <div className="key-metric-box">
                  <Sliders size={20} className="text-red" />
                  <div>
                    <span className="metric-label">Transmission</span>
                    <strong className="metric-value">{vehicle.transmission}</strong>
                  </div>
                </div>
                <div className="key-metric-box">
                  <Fuel size={20} className="text-red" />
                  <div>
                    <span className="metric-label">Fuel System</span>
                    <strong className="metric-value">{vehicle.fuelType}</strong>
                  </div>
                </div>
              </div>

              {/* Price & Showroom Availability Box */}
              <div className="vehicle-detail-price-card">
                <div className="price-card-header">
                  <span className="price-card-tag">EX-SHOWROOM &amp; ON-ROAD PRICE</span>
                  <span className="price-card-location">Batauli, Chhattisgarh</span>
                </div>
                <p className="price-card-status">{vehicle.priceStatus}</p>
                <p className="price-card-note">
                  Prices vary by selected variant (such as Drum, Disc, or Smart key
                  trims), applicable RTO registration, and insurance. Contact Ankan
                  Honda for an accurate Batauli price quotation.
                </p>
              </div>

              {/* Primary Enquiry & Test Ride Buttons */}
              <div className="vehicle-detail-cta-row">
                <button
                  type="button"
                  className="btn btn-whatsapp btn-lg"
                  onClick={() => handleVehicleWhatsApp()}
                >
                  <WhatsAppIcon size={19} />
                  <span>Enquire on WhatsApp</span>
                </button>
                <Link
                  to={`/test-ride?vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="btn btn-primary btn-lg"
                >
                  <Calendar size={19} />
                  <span>Request a Test Ride</span>
                </Link>
              </div>

              {/* Overview Text */}
              <div className="vehicle-overview-block">
                <h2>Model Overview</h2>
                <p>{vehicle.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Verified Highlights Section */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          <div className="specs-highlights-grid">
            {/* Verified Highlights */}
            <div className="highlights-panel">
              <span className="section-eyebrow">MODEL CHARACTERISTICS</span>
              <h2>Key Highlights</h2>
              <p className="panel-subtext">
                General model characteristics for the {vehicle.name}. Confirm exact
                variant equipment with the showroom.
              </p>
              <ul className="verified-highlights-list">
                {vehicle.verifiedHighlights.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={18} className="highlight-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div className="specs-panel">
              <span className="section-eyebrow">REFERENCE INFORMATION</span>
              <h2>Catalogue Specifications</h2>
              <p className="panel-subtext">
                Unverified or variant-specific figures are marked for direct showroom
                confirmation.
              </p>
              <div className="specs-table-wrapper">
                <table className="specs-table">
                  <tbody>
                    {vehicle.specifications.map((spec, idx) => (
                      <tr key={idx}>
                        <th scope="row">{spec.label}</th>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* One-Click Common Customer Questions */}
          {vehicle.enquiryQuestions && vehicle.enquiryQuestions.length > 0 && (
            <div className="quick-questions-box">
              <div className="quick-questions-header">
                <HelpCircle size={20} className="text-red" />
                <div>
                  <h3>Have a Specific Question About the {vehicle.name}?</h3>
                  <p>
                    Click any question below to generate a prefilled WhatsApp enquiry
                    for Ankan Honda, Batauli:
                  </p>
                </div>
              </div>
              <div className="quick-questions-list">
                {vehicle.enquiryQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quick-question-chip"
                    onClick={() => handleVehicleWhatsApp(question)}
                  >
                    <WhatsAppIcon size={15} />
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Vehicles Section */}
      <section className="section-padding bg-white" aria-labelledby="related-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">EXPLORE MORE OPTIONS</span>
              <h2 id="related-heading" className="section-title">
                Other Honda Two-Wheelers to Consider
              </h2>
            </div>
            <div className="section-header-actions">
              <Link to="/vehicles" className="btn btn-outline-dark">
                <span>View Full Catalogue</span>
              </Link>
            </div>
          </div>

          <div className="vehicles-grid">
            {relatedVehicles.map((relVehicle, index) => (
              <VehicleCard key={relVehicle.id} vehicle={relVehicle} index={index} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
