import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { DEALERSHIP_CONFIG, WHATSAPP_MESSAGES } from '../config/dealership';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Hero() {
  const [heroImgSrc, setHeroImgSrc] = useState('/images/vehicles/hero-motorcycle.png');
  const shouldReduceMotion = useReducedMotion();
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, delay, ease: 'easeOut' },
    }),
  };

  return (
    <section className="hero-section" aria-label="Ankan Honda Hero Showcase">
      <div className="hero-bg-accent" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left Editorial Column */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <div className="hero-eyebrow">
            <span className="hero-red-pill">ANKAN HONDA</span>
            <span className="hero-location-tag">
              <MapPin size={14} />
              Batauli, Chhattisgarh
            </span>
          </div>

          <h1 className="hero-headline">
            YOUR JOURNEY.
            <span className="hero-headline-accent">OUR PASSION.</span>
          </h1>

          <p className="hero-subtext">
            Discover Honda two-wheelers with Ankan Honda, Batauli. Explore your
            options and connect with our dealership for personalised assistance.
          </p>

          <div className="hero-cta-group">
            <Link to="/vehicles" className="btn btn-primary btn-lg">
              <span>Explore Vehicles</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/test-ride" className="btn btn-outline-light btn-lg">
              <Calendar size={18} />
              <span>Book a Test Ride</span>
            </Link>
          </div>

          {/* Quick Trust & Enquiry Bar */}
          <div className="hero-trust-strip">
            <div className="hero-trust-item">
              <ShieldCheck size={18} className="hero-trust-icon" />
              <div>
                <strong>Motorcycles &amp; Scooters</strong>
                <span>Explore 100cc to 185cc class Honda models</span>
              </div>
            </div>
            <button
              type="button"
              className="hero-whatsapp-quick"
              onClick={() =>
                triggerWhatsAppEnquiry({
                  title: 'Enquire with Ankan Honda, Batauli',
                  subtitle:
                    'Connect with our showroom for model availability and latest price guidance.',
                  messageText: WHATSAPP_MESSAGES.generalEnquiry(),
                })
              }
            >
              <WhatsAppIcon size={16} />
              <span>Direct WhatsApp Enquiry</span>
            </button>
          </div>
        </motion.div>

        {/* Right Cinematic Motorcycle Visual Column */}
        <motion.div
          className="hero-visual-wrapper"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: 0.1 }}
        >
          <div className="hero-visual-stage">
            <div className="hero-stage-glow" aria-hidden="true" />
            <img
              src={heroImgSrc}
              alt="Honda commuter-sport motorcycle showcased in studio lighting"
              className="hero-vehicle-img"
              onError={() => setHeroImgSrc('/images/vehicles/fallback-hero.svg')}
            />

            <div className="hero-caption-card">
              <div className="hero-caption-top">
                <span className="hero-caption-badge">CATALOGUE SHOWCASE</span>
                <span className="hero-caption-city">BATAULI SHOWROOM</span>
              </div>
              <p className="hero-caption-text">
                Illustrative Honda product visual. Contact Ankan Honda to confirm
                in-stock models, colour variants, and current Batauli on-road prices.
              </p>
              <Link to="/vehicles" className="hero-caption-link">
                Browse All Models <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
