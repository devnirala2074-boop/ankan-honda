import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Bike,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { VEHICLES } from '../data/vehicles';
import {
  DEALERSHIP_CONFIG,
  WHATSAPP_MESSAGES,
  buildWhatsAppLink,
} from '../config/dealership';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const TIME_SLOTS = [
  'Morning (10:00 AM – 12:30 PM)',
  'Afternoon (12:30 PM – 03:30 PM)',
  'Evening (03:30 PM – 06:00 PM)',
  'Flexible — Please suggest a convenient time',
];

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function TestRide() {
  useDocumentMeta({
    title: 'Request a Test Ride',
    description:
      'Request a Honda motorcycle or scooter test ride with Ankan Honda in Batauli, Chhattisgarh. Select your preferred vehicle, date, and time to generate a WhatsApp enquiry.',
    path: '/test-ride',
  });

  const [searchParams] = useSearchParams();
  const preselectedVehicle = searchParams.get('vehicle') || '';

  const [submissionResult, setSubmissionResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const todayStr = getTodayDateString();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      mobile: '',
      vehicle: preselectedVehicle || '',
      date: '',
      time: '',
      message: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (preselectedVehicle) {
      setValue('vehicle', preselectedVehicle);
    }
  }, [preselectedVehicle, setValue]);

  const onSubmit = async (data) => {
    // Brief pause to prevent accidental double-clicks
    await new Promise((resolve) => setTimeout(resolve, 250));

    const cleanMobile = data.mobile.replace(/\s+/g, '');
    const formattedMessage = WHATSAPP_MESSAGES.testRideRequest({
      fullName: data.fullName.trim(),
      mobile: cleanMobile,
      vehicle: data.vehicle,
      date: data.date,
      time: data.time,
      message: data.message,
    });

    const whatsappLinkData = buildWhatsAppLink(formattedMessage);

    setSubmissionResult({
      formData: data,
      message: formattedMessage,
      whatsappLinkData,
    });

    // If dealership WhatsApp number is configured, open WhatsApp in a new tab
    if (whatsappLinkData.isConfigured) {
      window.open(whatsappLinkData.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyMessage = async () => {
    if (!submissionResult?.message) return;
    try {
      await navigator.clipboard.writeText(submissionResult.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = submissionResult.message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleStartNewRequest = () => {
    setSubmissionResult(null);
    setCopied(false);
    reset();
  };

  return (
    <div className="page-test-ride">
      {/* Page Header Banner */}
      <section className="page-banner bg-charcoal text-light">
        <div className="container">
          <span className="section-eyebrow eyebrow-red">
            EXPERIENCE HONDA IN BATAULI
          </span>
          <h1 className="page-banner-title">Request a Test Ride</h1>
          <p className="page-banner-subtitle">
            Complete the form below with your preferred Honda model and schedule.
            Your details will be formatted into a structured WhatsApp enquiry for{' '}
            <strong>Ankan Honda, Batauli</strong> to review and confirm.
          </p>
        </div>
      </section>

      <section className="section-padding bg-light-gray">
        <div className="container">
          <div className="test-ride-layout">
            {/* Left / Main Form Column */}
            <div className="test-ride-form-col">
              {!submissionResult ? (
                <div className="form-card">
                  <div className="form-card-header">
                    <h2>Test Ride Enquiry Details</h2>
                    <p>
                      Fields marked with <span className="req-star">*</span> are
                      required. Submitting this form prepares a WhatsApp message and
                      does not automatically confirm a reservation.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="dealership-form"
                  >
                    <div className="form-row-two">
                      {/* Full Name */}
                      <div className="form-group">
                        <label htmlFor="tr-fullName" className="form-label">
                          <User size={15} />
                          <span>
                            Full Name <span className="req-star">*</span>
                          </span>
                        </label>
                        <input
                          id="tr-fullName"
                          type="text"
                          className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                          placeholder="Enter your full name"
                          aria-invalid={errors.fullName ? 'true' : 'false'}
                          aria-describedby={
                            errors.fullName ? 'tr-fullName-error' : undefined
                          }
                          {...register('fullName', {
                            required: 'Please enter your full name.',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters long.',
                            },
                            validate: (val) =>
                              val.trim().length >= 2 ||
                              'Please enter a valid full name.',
                          })}
                        />
                        {errors.fullName && (
                          <p
                            id="tr-fullName-error"
                            className="field-error-msg"
                            role="alert"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.fullName.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Indian Mobile Number */}
                      <div className="form-group">
                        <label htmlFor="tr-mobile" className="form-label">
                          <Phone size={15} />
                          <span>
                            Mobile Number (India) <span className="req-star">*</span>
                          </span>
                        </label>
                        <input
                          id="tr-mobile"
                          type="tel"
                          inputMode="tel"
                          className={`form-input ${errors.mobile ? 'input-error' : ''}`}
                          placeholder="e.g. 9876543210"
                          aria-invalid={errors.mobile ? 'true' : 'false'}
                          aria-describedby={
                            errors.mobile ? 'tr-mobile-error' : undefined
                          }
                          {...register('mobile', {
                            required: 'Please enter your 10-digit mobile number.',
                            validate: (val) => {
                              const cleaned = (val || '')
                                .replace(/[\s\-()]/g, '')
                                .replace(/^(\+91|91|0)/, '');
                              return (
                                /^[6-9]\d{9}$/.test(cleaned) ||
                                'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
                              );
                            },
                          })}
                        />
                        {errors.mobile && (
                          <p
                            id="tr-mobile-error"
                            className="field-error-msg"
                            role="alert"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.mobile.message}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Preferred Vehicle */}
                    <div className="form-group">
                      <label htmlFor="tr-vehicle" className="form-label">
                        <Bike size={15} />
                        <span>
                          Preferred Honda Vehicle <span className="req-star">*</span>
                        </span>
                      </label>
                      <select
                        id="tr-vehicle"
                        className={`form-select ${errors.vehicle ? 'input-error' : ''}`}
                        aria-invalid={errors.vehicle ? 'true' : 'false'}
                        aria-describedby={
                          errors.vehicle ? 'tr-vehicle-error' : undefined
                        }
                        {...register('vehicle', {
                          required: 'Please select a preferred Honda model.',
                        })}
                      >
                        <option value="">-- Select a Honda Motorcycle or Scooter --</option>
                        <optgroup label="Motorcycles">
                          {VEHICLES.filter((v) => v.category === 'Motorcycle').map(
                            (v) => (
                              <option key={v.id} value={v.name}>
                                {v.name} — {v.engineClass}
                              </option>
                            )
                          )}
                        </optgroup>
                        <optgroup label="Scooters">
                          {VEHICLES.filter((v) => v.category === 'Scooter').map(
                            (v) => (
                              <option key={v.id} value={v.name}>
                                {v.name} — {v.engineClass}
                              </option>
                            )
                          )}
                        </optgroup>
                        <option value="Other Honda Model (Please specify in message)">
                          Other Honda Model (Specify in message below)
                        </option>
                      </select>
                      {errors.vehicle && (
                        <p
                          id="tr-vehicle-error"
                          className="field-error-msg"
                          role="alert"
                        >
                          <AlertCircle size={14} />
                          <span>{errors.vehicle.message}</span>
                        </p>
                      )}
                    </div>

                    <div className="form-row-two">
                      {/* Preferred Date */}
                      <div className="form-group">
                        <label htmlFor="tr-date" className="form-label">
                          <Calendar size={15} />
                          <span>
                            Preferred Date <span className="req-star">*</span>
                          </span>
                        </label>
                        <input
                          id="tr-date"
                          type="date"
                          min={todayStr}
                          className={`form-input ${errors.date ? 'input-error' : ''}`}
                          aria-invalid={errors.date ? 'true' : 'false'}
                          aria-describedby={errors.date ? 'tr-date-error' : undefined}
                          {...register('date', {
                            required: 'Please choose a preferred date.',
                            validate: (val) => {
                              if (!val) return 'Please choose a preferred date.';
                              const selected = new Date(`${val}T00:00:00`);
                              const today = new Date(`${todayStr}T00:00:00`);
                              if (isNaN(selected.getTime())) {
                                return 'Please enter a valid calendar date.';
                              }
                              if (selected < today) {
                                return 'Preferred date cannot be in the past. Please select today or a future date.';
                              }
                              return true;
                            },
                          })}
                        />
                        {errors.date && (
                          <p
                            id="tr-date-error"
                            className="field-error-msg"
                            role="alert"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.date.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Preferred Time */}
                      <div className="form-group">
                        <label htmlFor="tr-time" className="form-label">
                          <Clock size={15} />
                          <span>
                            Preferred Time Slot <span className="req-star">*</span>
                          </span>
                        </label>
                        <select
                          id="tr-time"
                          className={`form-select ${errors.time ? 'input-error' : ''}`}
                          aria-invalid={errors.time ? 'true' : 'false'}
                          aria-describedby={errors.time ? 'tr-time-error' : undefined}
                          {...register('time', {
                            required: 'Please select a preferred time slot.',
                          })}
                        >
                          <option value="">-- Select a Time Slot --</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p
                            id="tr-time-error"
                            className="field-error-msg"
                            role="alert"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.time.message}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Optional Message */}
                    <div className="form-group">
                      <label htmlFor="tr-message" className="form-label">
                        <MessageSquare size={15} />
                        <span>Optional Message / Questions</span>
                      </label>
                      <textarea
                        id="tr-message"
                        rows={3}
                        className="form-textarea"
                        placeholder="Mention any specific variant, colour preference, or question for the Batauli showroom..."
                        {...register('message', {
                          maxLength: {
                            value: 500,
                            message: 'Message must be 500 characters or fewer.',
                          },
                        })}
                      />
                      {errors.message && (
                        <p className="field-error-msg" role="alert">
                          <AlertCircle size={14} />
                          <span>{errors.message.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Transparent Notice */}
                    <div className="form-submission-notice">
                      <ShieldCheck size={18} className="text-red" />
                      <p>
                        <strong>How WhatsApp Submission Works:</strong> Clicking the
                        button below generates a formatted test ride enquiry message.
                        You must send the message on WhatsApp to complete your request,
                        and <strong>Ankan Honda, Batauli</strong> will reply to confirm
                        whether the vehicle and requested date/time are available.
                      </p>
                    </div>

                    <div className="form-submit-row">
                      <button
                        type="submit"
                        className="btn btn-whatsapp btn-lg btn-block"
                        disabled={isSubmitting}
                      >
                        <WhatsAppIcon size={20} />
                        <span>
                          {isSubmitting
                            ? 'Preparing WhatsApp Enquiry...'
                            : 'Prepare & Send Test Ride Request on WhatsApp'}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Clear Post-Submission Experience */
                <div className="form-card submission-result-card" role="region" aria-live="polite">
                  <div className="submission-status-banner">
                    <CheckCircle2 size={26} className="submission-status-icon" />
                    <div>
                      <h2>Test Ride Enquiry Message Prepared</h2>
                      <p>
                        Important: Your request is <strong>not yet confirmed</strong>.
                        Please send the prefilled WhatsApp message below to complete
                        your request and await confirmation from Ankan Honda, Batauli.
                      </p>
                    </div>
                  </div>

                  {!submissionResult.whatsappLinkData.isConfigured && (
                    <div className="wa-setup-notice" role="status">
                      <AlertCircle size={18} className="wa-setup-icon" />
                      <div>
                        <strong>Showroom WhatsApp Number Pending Configuration</strong>
                        <p>
                          The official dealership WhatsApp number is configured as a
                          placeholder in <code>src/config/dealership.js</code> so no
                          fake phone number is published. Once supplied, this step
                          automatically opens a direct chat with the showroom. You can
                          copy your formatted message or launch WhatsApp with the
                          prefilled text below:
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="wa-message-preview-box">
                    <div className="wa-message-preview-header">
                      <span>YOUR FORMATTED WHATSAPP MESSAGE</span>
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
                    <pre className="wa-message-pre">{submissionResult.message}</pre>
                  </div>

                  <div className="submission-steps-box">
                    <h3>Next Steps to Complete Your Request:</h3>
                    <ol className="submission-steps-list">
                      <li>
                        Click <strong>Open WhatsApp with Prefilled Request</strong>{' '}
                        below and press <strong>Send</strong> in WhatsApp.
                      </li>
                      <li>
                        Wait for the <strong>Ankan Honda, Batauli</strong> team to
                        verify whether the{' '}
                        <strong>{submissionResult.formData.vehicle}</strong> is
                        available for a test ride on{' '}
                        <strong>{submissionResult.formData.date}</strong> ({' '}
                        {submissionResult.formData.time}).
                      </li>
                      <li>
                        Bring a valid original two-wheeler Driving Licence when visiting
                        the showroom for a test ride.
                      </li>
                    </ol>
                  </div>

                  <div className="submission-result-actions">
                    <a
                      href={submissionResult.whatsappLinkData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg"
                    >
                      <WhatsAppIcon size={19} />
                      <span>Open WhatsApp with Prefilled Request</span>
                      <ExternalLink size={16} />
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg"
                      onClick={handleStartNewRequest}
                    >
                      <RotateCcw size={16} />
                      <span>Edit or Submit Another Request</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Helpful Guidelines */}
            <aside className="test-ride-sidebar">
              <div className="sidebar-info-card">
                <span className="section-eyebrow">BEFORE YOU VISIT</span>
                <h3>Test Ride Guidelines</h3>
                <ul className="sidebar-checklist">
                  <li>
                    <CheckCircle2 size={17} className="text-red" />
                    <span>
                      <strong>Driving Licence Required:</strong> Please carry a valid,
                      original Indian two-wheeler driving licence.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={17} className="text-red" />
                    <span>
                      <strong>Subject to Showroom Confirmation:</strong> Test ride
                      availability depends on current demo/showroom stock at Batauli.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={17} className="text-red" />
                    <span>
                      <strong>Safety Gear:</strong> Wearing a BIS/ISI-certified helmet
                      and closed footwear is required during any test ride.
                    </span>
                  </li>
                </ul>

                <div className="sidebar-divider" />

                <h4>Not Sure Which Model to Pick?</h4>
                <p>
                  Compare motorcycles and scooters in our catalogue before submitting
                  your request.
                </p>
                <Link to="/vehicles" className="btn btn-outline-dark btn-block">
                  <span>Browse Vehicle Catalogue</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
