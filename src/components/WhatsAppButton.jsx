import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_MESSAGES } from '../config/dealership';
import { useEnquiryModal } from '../context/EnquiryModalContext';

/**
 * Floating WhatsApp Button (fixed bottom-right) for quick customer enquiries
 * across all pages.
 */
export default function WhatsAppButton() {
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  const handleClick = () => {
    triggerWhatsAppEnquiry({
      title: 'Quick WhatsApp Enquiry — Ankan Honda',
      subtitle:
        'Ask about Honda motorcycles, scooters, test ride availability, or showroom assistance in Batauli.',
      messageText: WHATSAPP_MESSAGES.generalEnquiry(),
    });
  };

  return (
    <div className="floating-wa-container">
      <button
        type="button"
        className="floating-wa-btn"
        onClick={handleClick}
        aria-label="Enquire with Ankan Honda on WhatsApp"
        title="Enquire on WhatsApp"
      >
        <span className="floating-wa-pulse" aria-hidden="true" />
        <WhatsAppIcon size={24} className="floating-wa-icon" />
        <span className="floating-wa-label">Enquire on WhatsApp</span>
      </button>
    </div>
  );
}
