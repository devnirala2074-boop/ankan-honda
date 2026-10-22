import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Bike,
  Wrench,
  Cog,
  Landmark,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_MESSAGES } from '../config/dealership';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const ICON_MAP = {
  Bike,
  Wrench,
  Cog,
  Landmark,
  ArrowLeftRight,
  ShieldCheck,
};

export default function ServiceCard({ service, detailed = false, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const { triggerWhatsAppEnquiry } = useEnquiryModal();
  const IconComponent = ICON_MAP[service.iconName] || Bike;

  const handleEnquire = () => {
    triggerWhatsAppEnquiry({
      title: service.title,
      subtitle: `Send an enquiry to Ankan Honda, Batauli regarding ${service.title.toLowerCase()}.`,
      messageText: WHATSAPP_MESSAGES.serviceEnquiry(service.title),
    });
  };

  return (
    <motion.article
      className={`service-card ${detailed ? 'service-card-detailed' : ''}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.25),
      }}
    >
      <div className="service-card-top">
        <div className="service-icon-box" aria-hidden="true">
          <IconComponent size={24} />
        </div>
        <span className="service-badge">{service.badge}</span>
      </div>

      <h3 className="service-card-title">{service.title}</h3>

      <p className="service-card-desc">
        {detailed ? service.detailedExplanation : service.shortDescription}
      </p>

      {detailed && service.whatToConfirm && (
        <div className="service-confirm-box">
          <h4 className="service-confirm-heading">
            Points to Confirm with Showroom:
          </h4>
          <ul className="service-confirm-list">
            {service.whatToConfirm.map((item, idx) => (
              <li key={idx}>
                <CheckCircle2 size={15} className="service-confirm-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="service-card-footer">
        <button
          type="button"
          className="btn btn-outline-red service-enquiry-btn"
          onClick={handleEnquire}
        >
          <WhatsAppIcon size={16} />
          <span>{service.ctaLabel || 'Enquire on WhatsApp'}</span>
        </button>
      </div>
    </motion.article>
  );
}
