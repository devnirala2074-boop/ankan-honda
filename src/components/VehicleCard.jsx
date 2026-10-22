import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Gauge,
  Sliders,
  Info,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_MESSAGES } from '../config/dealership';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function VehicleCard({ vehicle, index = 0 }) {
  const [imgSrc, setImgSrc] = useState(vehicle.image);
  const shouldReduceMotion = useReducedMotion();
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

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

  const handleWhatsAppClick = () => {
    triggerWhatsAppEnquiry({
      title: `Enquire About ${vehicle.name}`,
      subtitle: `Check current Batauli showroom availability, variant options, and latest price for the ${vehicle.name}.`,
      messageText: WHATSAPP_MESSAGES.vehicleEnquiry(
        vehicle.name,
        vehicle.category
      ),
    });
  };

  return (
    <motion.article
      className="vehicle-card"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.25),
      }}
    >
      {/* Top Image Stage */}
      <div className="vehicle-card-media">
        <div className="vehicle-card-badges">
          <span
            className={`vehicle-category-pill ${
              vehicle.category === 'Scooter' ? 'pill-scooter' : 'pill-motorcycle'
            }`}
          >
            {vehicle.category}
          </span>
          <span className="vehicle-segment-pill">{vehicle.segment}</span>
        </div>

        <Link
          to={`/vehicles/${vehicle.slug}`}
          className="vehicle-card-image-link"
          aria-label={`View details for ${vehicle.name}`}
        >
          <img
            src={imgSrc}
            alt={`${vehicle.name} (${vehicle.category}) — Illustrative product image`}
            className="vehicle-card-img"
            loading="lazy"
            onError={handleImageError}
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="vehicle-card-body">
        <div className="vehicle-card-header">
          <h3 className="vehicle-card-title">
            <Link to={`/vehicles/${vehicle.slug}`}>{vehicle.name}</Link>
          </h3>
        </div>

        {/* Verified Spec Chips */}
        <div className="vehicle-spec-chips">
          <div className="vehicle-spec-chip" title="Nominal Engine Class">
            <Gauge size={14} className="spec-chip-icon" />
            <span>{vehicle.engineClass}</span>
          </div>
          <div className="vehicle-spec-chip" title="Transmission Type">
            <Sliders size={14} className="spec-chip-icon" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        <p className="vehicle-card-desc">{vehicle.shortDescription}</p>

        {/* Pricing & Availability Notice */}
        <div className="vehicle-price-box">
          <div className="vehicle-price-label">
            <Info size={14} />
            <span>PRICE &amp; STOCK STATUS</span>
          </div>
          <p className="vehicle-price-value">{vehicle.priceStatus}</p>
          <small className="vehicle-availability-note">
            {vehicle.availabilityNote}
          </small>
        </div>

        {/* Card Footer CTAs */}
        <div className="vehicle-card-actions">
          <Link
            to={`/vehicles/${vehicle.slug}`}
            className="btn btn-outline-dark vehicle-btn-details"
          >
            <span>View Details</span>
            <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            className="btn btn-whatsapp vehicle-btn-wa"
            onClick={handleWhatsAppClick}
          >
            <WhatsAppIcon size={16} />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
