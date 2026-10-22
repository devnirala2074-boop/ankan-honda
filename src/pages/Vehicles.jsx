import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Info,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import VehicleCard from '../components/VehicleCard';
import ContactCTA from '../components/ContactCTA';
import { VEHICLES, VEHICLE_CATEGORIES } from '../data/vehicles';
import { DEALERSHIP_CONFIG, WHATSAPP_MESSAGES } from '../config/dealership';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Vehicles() {
  useDocumentMeta({
    title: 'Bikes & Scooters Catalogue',
    description:
      'Browse Honda motorcycles and scooters with Ankan Honda, Batauli. Filter by category, search models like Activa, SP 125, Shine 125, Unicorn, and Dio, and enquire on WhatsApp.',
    path: '/vehicles',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(
    VEHICLE_CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { triggerWhatsAppEnquiry } = useEnquiryModal();

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = VEHICLES.filter((vehicle) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        vehicle.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !query ||
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.segment.toLowerCase().includes(query) ||
        vehicle.engineClass.toLowerCase().includes(query) ||
        vehicle.shortDescription.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return a.popularRank - b.popularRank;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('popular');
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="page-vehicles">
      {/* Page Hero Header */}
      <section className="page-banner bg-charcoal text-light">
        <div className="container">
          <span className="section-eyebrow eyebrow-red">
            ANKAN HONDA • BATAULI SHOWROOM
          </span>
          <h1 className="page-banner-title">Honda Bikes &amp; Scooters</h1>
          <p className="page-banner-subtitle">
            Explore our illustrative catalogue of Honda motorcycles and scooters.
            Select any model to view overview details, request a test ride, or enquire
            with our Batauli showroom for current stock and on-road pricing.
          </p>
        </div>
      </section>

      {/* Filter, Search & Sort Controls Bar */}
      <section className="catalogue-controls-section" aria-label="Catalogue Filters">
        <div className="container">
          <div className="catalogue-toolbar">
            {/* Category Filter Tabs */}
            <div className="category-tabs" role="tablist" aria-label="Vehicle Categories">
              {VEHICLE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? VEHICLES.length
                    : VEHICLES.filter((v) => v.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`category-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className="category-count-pill">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="search-sort-group">
              <div className="search-input-wrapper">
                <Search size={18} className="search-input-icon" aria-hidden="true" />
                <input
                  type="search"
                  className="catalogue-search-input"
                  placeholder="Search by model (e.g. Activa, SP 125, Shine)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search vehicles by name or engine class"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="sort-select-wrapper">
                <SlidersHorizontal size={16} className="sort-icon" aria-hidden="true" />
                <label htmlFor="vehicle-sort-select" className="sr-only">
                  Sort vehicles
                </label>
                <select
                  id="vehicle-sort-select"
                  className="catalogue-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Sort: Featured Models</option>
                  <option value="name-asc">Sort: Model Name (A–Z)</option>
                  <option value="name-desc">Sort: Model Name (Z–A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Results Summary */}
          <div className="catalogue-results-bar">
            <p className="results-count-text">
              Showing <strong>{filteredVehicles.length}</strong> of{' '}
              <strong>{VEHICLES.length}</strong> catalogue models
              {selectedCategory !== 'all' && (
                <span>
                  {' '}
                  in <strong>{selectedCategory}s</strong>
                </span>
              )}
              {searchQuery.trim() && (
                <span>
                  {' '}
                  matching &ldquo;<strong>{searchQuery.trim()}</strong>&rdquo;
                </span>
              )}
            </p>
            {(selectedCategory !== 'all' || searchQuery.trim() || sortBy !== 'popular') && (
              <button
                type="button"
                className="reset-filters-link"
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          {filteredVehicles.length > 0 ? (
            <div className="vehicles-grid">
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-catalogue-state" role="status">
              <h3>No Matching Models Found</h3>
              <p>
                We couldn&apos;t find a catalogue entry matching &ldquo;
                <strong>{searchQuery}</strong>&rdquo; in the selected category. Try
                clearing your search filter or enquire directly with our Batauli
                showroom about a specific Honda model.
              </p>
              <div className="empty-state-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={16} />
                  <span>Show All Vehicles</span>
                </button>
                <button
                  type="button"
                  className="btn btn-whatsapp"
                  onClick={() =>
                    triggerWhatsAppEnquiry({
                      title: 'Enquire About a Specific Honda Model',
                      subtitle:
                        'Ask Ankan Honda, Batauli about availability of a specific model.',
                      messageText: WHATSAPP_MESSAGES.generalEnquiry(),
                    })
                  }
                >
                  <WhatsAppIcon size={16} />
                  <span>Ask Showroom on WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* Transparency & Pricing Box */}
          <div className="catalogue-disclaimer-card">
            <div className="disclaimer-card-left">
              <Info size={22} className="text-red" />
              <div>
                <h3>Important Note on Pricing, Specifications &amp; Availability</h3>
                <p>{DEALERSHIP_CONFIG.disclaimers.catalogueNote}</p>
              </div>
            </div>
            <div className="disclaimer-card-right">
              <Link to="/test-ride" className="btn btn-outline-dark">
                <Calendar size={16} />
                <span>Request a Test Ride</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
