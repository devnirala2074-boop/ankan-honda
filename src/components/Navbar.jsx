import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Menu,
  X,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  DEALERSHIP_CONFIG,
  WHATSAPP_MESSAGES,
} from '../config/dealership';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/vehicles', label: 'Bikes & Scooters' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleQuickEnquiry = () => {
    setMobileMenuOpen(false);
    triggerWhatsAppEnquiry({
      title: 'Connect with Ankan Honda, Batauli',
      subtitle:
        'Send a general showroom enquiry via WhatsApp for vehicle availability, price details, or assistance.',
      messageText: WHATSAPP_MESSAGES.generalEnquiry(),
    });
  };

  return (
    <header className="site-header-wrapper">
      {/* A. Slim Announcement Bar */}
      {DEALERSHIP_CONFIG.announcement.enabled && (
        <div className="announcement-bar" role="region" aria-label="Showroom Announcement">
          <div className="container announcement-inner">
            <div className="announcement-content">
              <span className="announcement-badge">
                <Sparkles size={12} />
                {DEALERSHIP_CONFIG.announcement.badge}
              </span>
              <p className="announcement-text">
                {DEALERSHIP_CONFIG.announcement.text}
              </p>
            </div>
            <div className="announcement-actions">
              <span className="announcement-location">
                <MapPin size={13} />
                {DEALERSHIP_CONFIG.city}, {DEALERSHIP_CONFIG.state}
              </span>
              <Link
                to={DEALERSHIP_CONFIG.announcement.ctaLink}
                className="announcement-link"
              >
                {DEALERSHIP_CONFIG.announcement.ctaText}
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* B. Sticky Main Navigation Bar */}
      <div className={`navbar-sticky ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Dealership Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="Ankan Honda Batauli Home">
            <div className="brand-emblem" aria-hidden="true">
              <span className="brand-wing">H</span>
            </div>
            <div className="brand-text-group">
              <span className="brand-title">
                ANKAN <span className="brand-honda">HONDA</span>
              </span>
              <span className="brand-subtitle">BATAULI • CHHATTISGARH</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-list">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="navbar-cta-group">
            <Link to="/test-ride" className="btn btn-nav-secondary">
              <Calendar size={16} />
              <span>Test Ride</span>
            </Link>
            <Link to="/contact" className="btn btn-primary btn-nav-enquire">
              <span>Enquire Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-navigation-drawer"
              className="mobile-nav-drawer"
              aria-label="Mobile Navigation"
              initial={{ x: shouldReduceMotion ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: shouldReduceMotion ? 0 : '100%' }}
              transition={{ type: 'tween', duration: shouldReduceMotion ? 0 : 0.26 }}
            >
              <div className="mobile-drawer-header">
                <div className="brand-text-group">
                  <span className="brand-title">
                    ANKAN <span className="brand-honda">HONDA</span>
                  </span>
                  <span className="brand-subtitle">BATAULI SHOWROOM</span>
                </div>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <ul className="mobile-nav-list">
                {NAV_LINKS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={18} />
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/test-ride"
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Request a Test Ride</span>
                    <ChevronRight size={18} />
                  </NavLink>
                </li>
              </ul>

              <div className="mobile-drawer-footer">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Enquire Now
                </Link>
                <button
                  type="button"
                  className="btn btn-whatsapp btn-block"
                  onClick={handleQuickEnquiry}
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp Enquiry
                </button>
                <a
                  href={DEALERSHIP_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-location-chip"
                >
                  <MapPin size={15} />
                  <span>Get Directions to Batauli Showroom</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
