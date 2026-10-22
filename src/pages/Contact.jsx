import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ExternalLink,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  DEALERSHIP_CONFIG,
  isPhoneConfigured,
  isWhatsAppConfigured,
  WHATSAPP_MESSAGES,
  buildWhatsAppLink,
} from '../config/dealership';
import { VEHICLES } from '../data/vehicles';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const ENQUIRY_CATEGORIES = [
  'New Vehicle Price & Availability',
  'Test Ride Enquiry',
  'Service & Maintenance Information',
  'Genuine Spare Parts / Accessories',
  'Finance / Exchange Assistance',
  'Insurance Assistance',
  'General Showroom Enquiry',
];

const CONTACT_FAQS = [
  {
    q: 'How can I check the current on-road price of a Honda bike or scooter in Batauli?',
    a: 'On-road prices depend on the exact model variant (such as Drum, Disc, or H-Smart), RTO registration charges, and mandatory insurance. You can submit the enquiry form on this page or click any "Enquire on WhatsApp" button to request the latest price quotation from Ankan Honda, Batauli.',
  },
  {
    q: 'Does submitting a form on this website confirm a vehicle booking or test ride?',
    a: 'No. Because this website is an informational and enquiry portal, submitting a form generates a structured WhatsApp message for the showroom. You must send the message on WhatsApp, and our showroom staff will reply to confirm stock or schedule availability.',
  },
  {
    q: 'Where are showroom phone numbers, address details, and timings configured?',
    a: 'All dealership contact details—including telephone number, WhatsApp number, full street address, email, and business hours—are managed in one central configuration file (src/config/dealership.js) so that only verified showroom details are published.',
  },
  {
    q: 'Can I enquire about finance, exchange, or periodic maintenance before visiting?',
    a: 'Yes. Select the relevant category in the contact form or visit our Services page to send a prefilled enquiry asking about required KYC documents, vehicle exchange evaluation, or workshop timings.',
  },
];

export default function Contact() {
  useDocumentMeta({
    title: 'Contact Showroom — Batauli, Chhattisgarh',
    description:
      'Contact Ankan Honda in Batauli, Surguja District, Chhattisgarh. Send a WhatsApp enquiry, get Google Maps directions, or read frequently asked questions.',
    path: '/contact',
  });

  const { triggerWhatsAppEnquiry } = useEnquiryModal();
  const [contactResult, setContactResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      mobile: '',
      enquiryType: ENQUIRY_CATEGORIES[0],
      vehicleInterest: '',
      message: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const cleanMobile = data.mobile.replace(/\s+/g, '');
    const formattedText = WHATSAPP_MESSAGES.contactFormSubmission({
      fullName: data.fullName.trim(),
      mobile: cleanMobile,
      enquiryType: data.enquiryType,
      vehicleInterest: data.vehicleInterest,
      message: data.message,
    });

    const whatsappLinkData = buildWhatsAppLink(formattedText);
    setContactResult({
      formData: data,
      message: formattedText,
      whatsappLinkData,
    });

    if (whatsappLinkData.isConfigured) {
      window.open(whatsappLinkData.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = async () => {
    if (!contactResult?.message) return;
    try {
      await navigator.clipboard.writeText(contactResult.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = contactResult.message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="page-contact">
      {/* Page Banner */}
      <section className="page-banner bg-charcoal text-light">
        <div className="container">
          <span className="section-eyebrow eyebrow-red">
            CONNECT WITH OUR SHOWROOM
          </span>
          <h1 className="page-banner-title">Contact Ankan Honda, Batauli</h1>
          <p className="page-banner-subtitle">
            Have a question about a Honda motorcycle or scooter, current pricing, or
            showroom services in Batauli? Send a direct enquiry below or navigate to our
            location via Google Maps.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form Grid */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column: Showroom Contact Details */}
            <div className="contact-details-col">
              <div className="contact-info-panel">
                <span className="section-eyebrow">SHOWROOM INFORMATION</span>
                <h2>{DEALERSHIP_CONFIG.name}</h2>
                <p className="contact-panel-lead">{DEALERSHIP_CONFIG.tagline}</p>

                <div className="contact-methods-list">
                  {/* Location / Address */}
                  <div className="contact-method-card">
                    <div className="contact-method-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="contact-method-body">
                      <h3>Showroom Location</h3>
                      <p>
                        <strong>
                          {DEALERSHIP_CONFIG.city}, {DEALERSHIP_CONFIG.district},{' '}
                          {DEALERSHIP_CONFIG.state} —{' '}
                          {DEALERSHIP_CONFIG.address.pinCode}
                        </strong>
                      </p>
                      <span className="placeholder-badge">
                        {DEALERSHIP_CONFIG.address.line1}
                      </span>
                      <div className="contact-method-action">
                        <a
                          href={DEALERSHIP_CONFIG.maps.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link-red"
                        >
                          <span>Open Directions in Google Maps</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Telephone */}
                  <div className="contact-method-card">
                    <div className="contact-method-icon">
                      <Phone size={20} />
                    </div>
                    <div className="contact-method-body">
                      <h3>Telephone Contact</h3>
                      {isPhoneConfigured() ? (
                        <p>
                          <a
                            href={`tel:${DEALERSHIP_CONFIG.contact.phone}`}
                            className="contact-tel-link"
                          >
                            {DEALERSHIP_CONFIG.contact.phone}
                          </a>
                        </p>
                      ) : (
                        <>
                          <span className="placeholder-badge">
                            {DEALERSHIP_CONFIG.contact.phoneDisplay}
                          </span>
                          <p className="contact-small-hint">
                            Editable in <code>src/config/dealership.js</code> once
                            confirmed by showroom management.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="contact-method-card">
                    <div className="contact-method-icon icon-wa">
                      <WhatsAppIcon size={20} />
                    </div>
                    <div className="contact-method-body">
                      <h3>WhatsApp Enquiry</h3>
                      <p>
                        {isWhatsAppConfigured()
                          ? `Connected: +${DEALERSHIP_CONFIG.contact.whatsappNumber}`
                          : DEALERSHIP_CONFIG.contact.whatsappDisplay}
                      </p>
                      <div className="contact-method-action">
                        <button
                          type="button"
                          className="btn btn-whatsapp btn-sm"
                          onClick={() =>
                            triggerWhatsAppEnquiry({
                              title: 'General Showroom Enquiry',
                              subtitle:
                                'Start a WhatsApp conversation with Ankan Honda, Batauli.',
                              messageText: WHATSAPP_MESSAGES.generalEnquiry(),
                            })
                          }
                        >
                          <WhatsAppIcon size={15} />
                          <span>Launch WhatsApp Enquiry</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="contact-method-card">
                    <div className="contact-method-icon">
                      <Clock size={20} />
                    </div>
                    <div className="contact-method-body">
                      <h3>Business Hours</h3>
                      <span className="placeholder-badge">
                        {DEALERSHIP_CONFIG.openingHours.schedule}
                      </span>
                      <p className="contact-small-hint">
                        {DEALERSHIP_CONFIG.openingHours.daysNote}
                      </p>
                    </div>
                  </div>

                  {/* Email Placeholder */}
                  <div className="contact-method-card">
                    <div className="contact-method-icon">
                      <Mail size={20} />
                    </div>
                    <div className="contact-method-body">
                      <h3>Email Address</h3>
                      {DEALERSHIP_CONFIG.contact.email ? (
                        <a href={`mailto:${DEALERSHIP_CONFIG.contact.email}`}>
                          {DEALERSHIP_CONFIG.contact.email}
                        </a>
                      ) : (
                        <span className="placeholder-badge">
                          {DEALERSHIP_CONFIG.contact.emailDisplay}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="contact-form-col">
              {!contactResult ? (
                <div className="form-card">
                  <div className="form-card-header">
                    <h2>Send a Showroom Enquiry</h2>
                    <p>
                      Fill out the form below to generate a structured WhatsApp enquiry
                      message for Ankan Honda, Batauli.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="dealership-form"
                  >
                    <div className="form-row-two">
                      <div className="form-group">
                        <label htmlFor="cf-fullName" className="form-label">
                          <User size={15} />
                          <span>
                            Your Name <span className="req-star">*</span>
                          </span>
                        </label>
                        <input
                          id="cf-fullName"
                          type="text"
                          className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                          placeholder="Enter your full name"
                          aria-invalid={errors.fullName ? 'true' : 'false'}
                          {...register('fullName', {
                            required: 'Please enter your name.',
                            validate: (v) =>
                              v.trim().length >= 2 ||
                              'Name must be at least 2 characters.',
                          })}
                        />
                        {errors.fullName && (
                          <p className="field-error-msg" role="alert">
                            <AlertCircle size={14} />
                            <span>{errors.fullName.message}</span>
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="cf-mobile" className="form-label">
                          <Phone size={15} />
                          <span>
                            Mobile Number <span className="req-star">*</span>
                          </span>
                        </label>
                        <input
                          id="cf-mobile"
                          type="tel"
                          inputMode="tel"
                          className={`form-input ${errors.mobile ? 'input-error' : ''}`}
                          placeholder="10-digit Indian mobile number"
                          aria-invalid={errors.mobile ? 'true' : 'false'}
                          {...register('mobile', {
                            required: 'Please enter your mobile number.',
                            validate: (val) => {
                              const cleaned = (val || '')
                                .replace(/[\s\-()]/g, '')
                                .replace(/^(\+91|91|0)/, '');
                              return (
                                /^[6-9]\d{9}$/.test(cleaned) ||
                                'Enter a valid 10-digit Indian mobile number.'
                              );
                            },
                          })}
                        />
                        {errors.mobile && (
                          <p className="field-error-msg" role="alert">
                            <AlertCircle size={14} />
                            <span>{errors.mobile.message}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label htmlFor="cf-enquiryType" className="form-label">
                          <span>
                            Enquiry Topic <span className="req-star">*</span>
                          </span>
                        </label>
                        <select
                          id="cf-enquiryType"
                          className="form-select"
                          {...register('enquiryType', { required: true })}
                        >
                          {ENQUIRY_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cf-vehicleInterest" className="form-label">
                          <span>Vehicle of Interest (Optional)</span>
                        </label>
                        <select
                          id="cf-vehicleInterest"
                          className="form-select"
                          {...register('vehicleInterest')}
                        >
                          <option value="">-- Any / Not Specific --</option>
                          {VEHICLES.map((v) => (
                            <option key={v.id} value={v.name}>
                              {v.name} ({v.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cf-message" className="form-label">
                        <MessageSquare size={15} />
                        <span>
                          Your Question or Message <span className="req-star">*</span>
                        </span>
                      </label>
                      <textarea
                        id="cf-message"
                        rows={4}
                        className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                        placeholder="How can Ankan Honda, Batauli assist you?"
                        aria-invalid={errors.message ? 'true' : 'false'}
                        {...register('message', {
                          required: 'Please enter your question or enquiry details.',
                          validate: (v) =>
                            v.trim().length >= 5 ||
                            'Please write a brief message (at least 5 characters).',
                        })}
                      />
                      {errors.message && (
                        <p className="field-error-msg" role="alert">
                          <AlertCircle size={14} />
                          <span>{errors.message.message}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-whatsapp btn-lg btn-block"
                      disabled={isSubmitting}
                    >
                      <WhatsAppIcon size={19} />
                      <span>
                        {isSubmitting
                          ? 'Formatting Enquiry...'
                          : 'Continue to WhatsApp with Enquiry'}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="form-card submission-result-card" role="region" aria-live="polite">
                  <div className="submission-status-banner">
                    <CheckCircle2 size={24} className="submission-status-icon" />
                    <div>
                      <h2>Enquiry Message Ready for WhatsApp</h2>
                      <p>
                        Please send the formatted message below via WhatsApp to complete
                        your enquiry with Ankan Honda, Batauli.
                      </p>
                    </div>
                  </div>

                  {!contactResult.whatsappLinkData.isConfigured && (
                    <div className="wa-setup-notice" role="status">
                      <AlertCircle size={18} className="wa-setup-icon" />
                      <div>
                        <strong>Showroom WhatsApp Number Pending Configuration</strong>
                        <p>
                          Update <code>whatsappNumber</code> in{' '}
                          <code>src/config/dealership.js</code> once verified by the
                          dealership. Meanwhile, you can copy or launch WhatsApp with
                          the prefilled message below:
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="wa-message-preview-box">
                    <div className="wa-message-preview-header">
                      <span>PREFILLED WHATSAPP ENQUIRY</span>
                      <button
                        type="button"
                        className="wa-copy-btn"
                        onClick={handleCopy}
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
                    <pre className="wa-message-pre">{contactResult.message}</pre>
                  </div>

                  <div className="submission-result-actions">
                    <a
                      href={contactResult.whatsappLinkData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg"
                    >
                      <WhatsAppIcon size={18} />
                      <span>Open WhatsApp with Message</span>
                      <ExternalLink size={15} />
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg"
                      onClick={() => {
                        setContactResult(null);
                        reset();
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>Write Another Enquiry</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="section-padding bg-white" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">CUSTOMER GUIDANCE</span>
            <h2 id="faq-heading" className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Common questions regarding vehicle enquiries, test rides, and showroom
              contact at Ankan Honda, Batauli.
            </p>
          </div>

          <div className="faq-accordion-list">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  >
                    <span className="faq-q-left">
                      <HelpCircle size={18} className="text-red" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
