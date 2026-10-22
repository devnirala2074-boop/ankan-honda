import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  ArrowUpRight,
  Info,
  MapPin,
} from 'lucide-react';
import ContactCTA from '../components/ContactCTA';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/gallery';
import { DEALERSHIP_CONFIG } from '../config/dealership';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Gallery() {
  useDocumentMeta({
    title: 'Visual Gallery — Honda Motorcycles & Scooters',
    description:
      'Browse studio photography of Honda motorcycles and scooters at Ankan Honda, Batauli. View detailed visuals with keyboard-accessible lightbox controls.',
    path: '/gallery',
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (filteredItems.length === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  // Keyboard accessibility for Lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const currentItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  return (
    <div className="page-gallery">
      {/* Page Banner */}
      <section className="page-banner bg-charcoal text-light">
        <div className="container">
          <span className="section-eyebrow eyebrow-red">
            AUTOMOTIVE VISUAL SHOWCASE
          </span>
          <h1 className="page-banner-title">Product &amp; Dealership Gallery</h1>
          <p className="page-banner-subtitle">
            Explore high-resolution product visuals across Honda motorcycles and
            scooters. Click any image to open the full-screen keyboard-accessible
            lightbox viewer.
          </p>
        </div>
      </section>

      {/* Filter Bar & Transparency Note */}
      <section className="catalogue-controls-section">
        <div className="container">
          <div className="gallery-filter-bar" role="tablist" aria-label="Gallery Categories">
            {GALLERY_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`category-tab-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setLightboxIndex(null);
                  }}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="gallery-distinction-note">
            <Info size={16} className="text-red" />
            <span>
              <strong>Visual Source Distinction:</strong> Every gallery item is clearly
              badged to distinguish between <em>Illustrative Product Studio Visuals</em>{' '}
              and actual <em>Batauli Showroom Photographs</em>. We never fabricate
              dealership building photographs.
            </span>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          {filteredItems.length > 0 ? (
            <div className="gallery-grid">
              {filteredItems.map((item, idx) => (
                <motion.figure
                  key={item.id}
                  className="gallery-card"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                    delay: shouldReduceMotion ? 0 : Math.min(idx * 0.05, 0.2),
                  }}
                >
                  <div className="gallery-card-media">
                    <span className="gallery-source-pill">{item.sourceBadge}</span>
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="gallery-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = item.fallbackSvg;
                      }}
                    />
                    <button
                      type="button"
                      className="gallery-zoom-trigger"
                      onClick={() => openLightbox(idx)}
                      aria-label={`Open ${item.title} in lightbox`}
                    >
                      <Maximize2 size={18} />
                      <span>Inspect Visual</span>
                    </button>
                  </div>

                  <figcaption className="gallery-card-body">
                    <span className="gallery-cat-label">{item.categoryLabel}</span>
                    <h3 className="gallery-card-title">{item.title}</h3>
                    <p className="gallery-card-caption">{item.caption}</p>
                    {item.vehicleSlug && (
                      <Link
                        to={`/vehicles/${item.vehicleSlug}`}
                        className="gallery-vehicle-link"
                      >
                        <span>View Model Details</span>
                        <ArrowUpRight size={15} />
                      </Link>
                    )}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ) : (
            /* Honest Placeholder State for Batauli Showroom Photos */
            <div className="showroom-gallery-placeholder" role="status">
              <div className="showroom-placeholder-icon">
                <Camera size={34} />
              </div>
              <h2>Authentic Batauli Showroom Photographs Pending Upload</h2>
              <p>
                To maintain strict authenticity, we do not display stock or synthetic
                building photographs as our physical dealership. Genuine photographs of
                the <strong>Ankan Honda showroom in Batauli, Chhattisgarh</strong> will
                appear in this category once supplied by dealership management.
              </p>
              <div className="empty-state-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setActiveCategory('all')}
                >
                  <span>View Product Photography</span>
                </button>
                <a
                  href={DEALERSHIP_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                >
                  <MapPin size={16} />
                  <span>Locate Showroom on Google Maps</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            className="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`Image Lightbox: ${currentItem.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <div className="lightbox-container">
              <div className="lightbox-topbar">
                <div className="lightbox-meta">
                  <span className="lightbox-badge">{currentItem.sourceBadge}</span>
                  <span className="lightbox-counter">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>
                </div>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={closeLightbox}
                  aria-label="Close lightbox (Escape)"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="lightbox-stage">
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-prev"
                  onClick={showPrev}
                  aria-label="Previous image (Left Arrow)"
                >
                  <ChevronLeft size={26} />
                </button>

                <div className="lightbox-img-wrapper">
                  <img
                    src={currentItem.image}
                    alt={currentItem.alt}
                    className="lightbox-img"
                    onError={(e) => {
                      e.currentTarget.src = currentItem.fallbackSvg;
                    }}
                  />
                </div>

                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-next"
                  onClick={showNext}
                  aria-label="Next image (Right Arrow)"
                >
                  <ChevronRight size={26} />
                </button>
              </div>

              <div className="lightbox-footer">
                <div>
                  <h3 className="lightbox-title">{currentItem.title}</h3>
                  <p className="lightbox-caption">{currentItem.caption}</p>
                </div>
                {currentItem.vehicleSlug && (
                  <Link
                    to={`/vehicles/${currentItem.vehicleSlug}`}
                    className="btn btn-primary btn-sm"
                    onClick={closeLightbox}
                  >
                    <span>Explore Model</span>
                    <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactCTA />
    </div>
  );
}
