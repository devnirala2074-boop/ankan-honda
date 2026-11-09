import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { DEALERSHIP_CONFIG } from '../config/dealership';

const FLOATING_ENQUIRY_MESSAGE = `Hello Ankan Honda (Batauli),

I visited your website and would like to enquire about Honda two-wheelers, vehicle availability, pricing, and test ride options.

Please share the details. Thank you.`;

/**
 * Detects whether the user is accessing the website from a mobile device
 * (Android, iPhone, iPad, iPod, or mobile userAgentData).
 */
function isMobileDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
    return navigator.userAgentData.mobile;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || ''
  );
}

/**
 * Builds the official https://wa.me click-to-chat URL using the existing
 * configured dealership WhatsApp number and URL-encoded prefilled message.
 */
function getDirectWhatsAppUrl() {
  const rawNumber = (DEALERSHIP_CONFIG.contact.whatsappNumber || '').replace(/\D/g, '');
  const encodedText = encodeURIComponent(FLOATING_ENQUIRY_MESSAGE);

  if (rawNumber.length >= 10) {
    return `https://wa.me/${rawNumber}?text=${encodedText}`;
  }
  return `https://wa.me/?text=${encodedText}`;
}

/**
 * Compact circular Floating WhatsApp Button (fixed bottom-right).
 * Directly opens WhatsApp (app on mobile, WhatsApp Web/Desktop on desktop)
 * with the prefilled dealership enquiry message and no intermediate modal.
 */
export default function WhatsAppButton() {
  const whatsappUrl = getDirectWhatsAppUrl();
  const isMobile = isMobileDevice();

  const handleClick = (event) => {
    const currentUrl = getDirectWhatsAppUrl();
    if (isMobileDevice()) {
      event.preventDefault();
      window.location.href = currentUrl;
    }
  };

  return (
    <div className="floating-wa-container">
      <a
        href={whatsappUrl}
        target={isMobile ? '_self' : '_blank'}
        rel={isMobile ? undefined : 'noopener noreferrer'}
        className="floating-wa-btn"
        onClick={handleClick}
        aria-label="Chat with Ankan Honda on WhatsApp"
      >
        <WhatsAppIcon size={32} className="floating-wa-icon" />
      </a>
    </div>
  );
}
