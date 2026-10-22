import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  DEALERSHIP_CONFIG,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
} from '../config/dealership';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';

const EnquiryModalContext = createContext(null);

export function EnquiryModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    message: '',
    whatsappData: null,
  });
  const [copied, setCopied] = useState(false);

  const triggerWhatsAppEnquiry = useCallback(
    ({ title = 'WhatsApp Showroom Enquiry', subtitle = '', messageText }) => {
      const text = messageText || WHATSAPP_MESSAGES.generalEnquiry();
      const whatsappData = buildWhatsAppLink(text);

      // If a verified dealership number is configured, open WhatsApp directly
      // and also display the confirmation instructions modal.
      if (whatsappData.isConfigured) {
        window.open(whatsappData.url, '_blank', 'noopener,noreferrer');
      }

      setCopied(false);
      setModalState({
        isOpen: true,
        title,
        subtitle:
          subtitle ||
          'Review your formatted enquiry message for Ankan Honda, Batauli.',
        message: text,
        whatsappData,
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    setCopied(false);
  }, []);

  const handleCopyMessage = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(modalState.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy method
      const textarea = document.createElement('textarea');
      textarea.value = modalState.message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [modalState.message]);

  return (
    <EnquiryModalContext.Provider value={{ triggerWhatsAppEnquiry, closeModal }}>
      {children}

      {modalState.isOpen && (
        <div
          className="wa-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="wa-modal-card">
            <div className="wa-modal-header">
              <div className="wa-modal-badge">
                <WhatsAppIcon size={18} />
                <span>ANKAN HONDA • WHATSAPP ENQUIRY</span>
              </div>
              <button
                type="button"
                className="wa-modal-close"
                onClick={closeModal}
                aria-label="Close enquiry dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="wa-modal-body">
              <h3 id="wa-modal-title" className="wa-modal-title">
                {modalState.title}
              </h3>
              <p className="wa-modal-subtitle">{modalState.subtitle}</p>

              {!modalState.whatsappData?.isConfigured ? (
                <div className="wa-setup-notice" role="status">
                  <AlertCircle size={18} className="wa-setup-icon" />
                  <div>
                    <strong>Showroom WhatsApp Number Pending Setup</strong>
                    <p>
                      To prevent fake contact details, the official showroom WhatsApp
                      number is stored as a configurable placeholder in{' '}
                      <code>src/config/dealership.js</code>. Once the verified number
                      is entered, this action opens directly to the showroom chat.
                      Meanwhile, your prefilled message is ready below:
                    </p>
                  </div>
                </div>
              ) : (
                <div className="wa-active-notice" role="status">
                  <Check size={18} />
                  <div>
                    <strong>WhatsApp Chat Opened</strong>
                    <p>
                      Please press <strong>Send</strong> inside WhatsApp to complete
                      your enquiry. Our showroom team in Batauli will respond and
                      confirm details.
                    </p>
                  </div>
                </div>
              )}

              <div className="wa-message-preview-box">
                <div className="wa-message-preview-header">
                  <span>PREFILLED ENQUIRY MESSAGE</span>
                  <button
                    type="button"
                    className="wa-copy-btn"
                    onClick={handleCopyMessage}
                  >
                    {copied ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Message
                      </>
                    )}
                  </button>
                </div>
                <pre className="wa-message-pre">{modalState.message}</pre>
              </div>

              <p className="wa-disclaimer-note">
                Note: Sending a WhatsApp message initiates an enquiry with Ankan
                Honda, Batauli. Vehicle availability, pricing, and test ride schedules
                are subject to confirmation by the dealership.
              </p>
            </div>

            <div className="wa-modal-footer">
              <a
                href={modalState.whatsappData?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon size={18} />
                {modalState.whatsappData?.isConfigured
                  ? 'Continue to Showroom WhatsApp'
                  : 'Open WhatsApp with Prefilled Text'}
                <ExternalLink size={15} />
              </a>
              <a
                href={DEALERSHIP_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <MapPin size={17} />
                Showroom Directions
              </a>
            </div>
          </div>
        </div>
      )}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
}
