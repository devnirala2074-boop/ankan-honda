/**
 * Central Vehicle Catalogue Data — Ankan Honda, Batauli
 *
 * NOTE ON DATA ACCURACY:
 * These entries represent illustrative Honda India two-wheeler models for
 * customer discovery. Exact variant specifications, colour availability,
 * showroom stock status, and current Batauli Ex-Showroom / On-Road prices
 * are marked for direct confirmation with Ankan Honda.
 */

export const VEHICLE_CATEGORIES = [
  { id: 'all', label: 'All Two-Wheelers' },
  { id: 'Motorcycle', label: 'Motorcycles' },
  { id: 'Scooter', label: 'Scooters' },
];

export const VEHICLES = [
  {
    id: 'honda-activa',
    slug: 'honda-activa',
    name: 'Honda Activa',
    category: 'Scooter',
    segment: 'Everyday Family Scooter',
    engineClass: '110cc Class (Nominal ~109.51 cc)',
    fuelType: 'Petrol (OBD2 / eSP Technology Class)',
    transmission: 'Automatic (V-Matic)',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm current stock & variants with Ankan Honda, Batauli',
    featured: true,
    popularRank: 1,
    image: '/images/vehicles/honda-activa.png',
    fallbackSvg: '/images/vehicles/fallback-scooter.svg',
    shortDescription:
      'Honda’s iconic family scooter designed for dependable daily commuting, comfortable ergonomics, and refined automatic riding in town and rural roads.',
    overview:
      'The Honda Activa is one of India’s most trusted everyday scooters, engineered for smooth automatic convenience, durable build quality, and family-friendly comfort. Enquire with Ankan Honda in Batauli to check currently available variants (Standard, DLX, or H-Smart), colour options, and current on-road pricing.',
    verifiedHighlights: [
      'Refined 4-stroke, single-cylinder air-cooled petrol engine architecture',
      'Automatic V-Matic gearless transmission for effortless city riding',
      'Telescopic front suspension for stability over uneven road surfaces',
      'Under-seat storage and comfortable upright seating posture',
      'External fuel fill convenience (variant-dependent — confirm at showroom)',
    ],
    specifications: [
      { label: 'Vehicle Category', value: 'Gearless Scooter' },
      { label: 'Engine Class', value: '110cc Class (Exact variant spec on enquiry)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Transmission', value: 'Automatic (V-Matic)' },
      { label: 'Front Suspension', value: 'Telescopic' },
      { label: 'Braking System', value: 'Combi Brake System (CBS) with Equalizer' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'What is the current on-road price of Honda Activa in Batauli?',
      'Which colour options and variants of Activa are currently in stock?',
      'Can I book a showroom visit or test ride for the Honda Activa?',
    ],
  },
  {
    id: 'honda-sp-125',
    slug: 'honda-sp-125',
    name: 'Honda SP 125',
    category: 'Motorcycle',
    segment: 'Sporty 125cc Commuter',
    engineClass: '125cc Class (Nominal ~123.94 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: '5-Speed Manual',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm Drum / Disc variant availability with Ankan Honda, Batauli',
    featured: true,
    popularRank: 2,
    image: '/images/vehicles/honda-sp125.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    shortDescription:
      'A sharp, contemporary 125cc commuter motorcycle blending athletic tank styling, a digital instrument console, and refined 5-speed performance.',
    overview:
      'The Honda SP 125 brings modern street presence to the 125cc commuter segment. Featuring sculpted tank shrouds, an informative digital meter display, and a smooth 5-speed gearbox, it is built for riders looking for style alongside everyday practicality. Contact Ankan Honda in Batauli to confirm Drum and Disc brake variant availability and latest pricing.',
    verifiedHighlights: [
      '125cc class 4-stroke PGM-FI engine with smooth 5-speed transmission',
      'Bold fuel tank extensions with athletic graphics and alloy wheels',
      'LED headlamp setup (confirm specific variant equipment at showroom)',
      'Digital instrument cluster with gear position and service due indicator',
      'Available in Drum and Front Disc brake configurations (subject to stock)',
    ],
    specifications: [
      { label: 'Vehicle Category', value: 'Commuter Motorcycle' },
      { label: 'Engine Class', value: '125cc Class (Nominal ~123.94 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Gearbox', value: '5-Speed Manual' },
      { label: 'Brake Variants', value: 'Drum / Disc (Confirm stock at showroom)' },
      { label: 'Wheels', value: 'Tubeless Tyres with Alloy Wheels' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'What is the difference in price between SP 125 Drum and Disc variants?',
      'Which colours of the Honda SP 125 are available at Ankan Honda Batauli?',
      'Is the Honda SP 125 available for a showroom inspection or test ride?',
    ],
  },
  {
    id: 'honda-shine-125',
    slug: 'honda-shine-125',
    category: 'Motorcycle',
    slug: 'honda-shine-125',
    name: 'Honda Shine 125',
    segment: 'Executive 125cc Commuter',
    engineClass: '125cc Class (Nominal ~123.94 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: '5-Speed Manual',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm Drum / Disc variant availability with Ankan Honda, Batauli',
    featured: true,
    popularRank: 3,
    image: '/images/vehicles/honda-shine125.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    shortDescription:
      'India’s benchmark executive 125cc motorcycle known for timeless styling, plush seating comfort, and dependable everyday commuting.',
    overview:
      'The Honda Shine 125 is a mainstay of Indian roads, valued for its refined engine response, comfortable upright riding ergonomics, and understated chrome detailing. Whether for daily work travel or inter-town errands around Surguja, the Shine 125 delivers composed ride quality. Reach out to Ankan Honda for current Batauli pricing and stock details.',
    verifiedHighlights: [
      'Proven 125cc class eSP / PGM-FI engine with quiet start system',
      '5-speed transmission for relaxed cruising and city flexibility',
      'Long, supportive single-piece seat suited for rider and pillion comfort',
      'Chrome accents on visor garnish and exhaust heat shield',
      'Combi Brake System (CBS) with Equalizer for balanced braking',
    ],
    specifications: [
      { label: 'Vehicle Category', value: 'Executive Commuter Motorcycle' },
      { label: 'Engine Class', value: '125cc Class (Nominal ~123.94 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Gearbox', value: '5-Speed Manual' },
      { label: 'Brake Options', value: 'Drum / Disc (Subject to showroom stock)' },
      { label: 'Suspension', value: 'Telescopic Front / Hydraulic Rear' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'Please share the latest on-road price of Honda Shine 125 in Batauli.',
      'Are both Drum and Disc variants of Shine 125 available to inspect?',
      'What documents are required for finance or exchange enquiries?',
    ],
  },
  {
    id: 'honda-unicorn',
    slug: 'honda-unicorn',
    name: 'Honda Unicorn',
    category: 'Motorcycle',
    segment: 'Premium 160cc Commuter',
    engineClass: '160cc Class (Nominal ~162.71 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: '5-Speed Manual',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm current availability with Ankan Honda, Batauli',
    featured: true,
    popularRank: 4,
    image: '/images/vehicles/honda-unicorn.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    shortDescription:
      'A mature 160cc motorcycle offering monoshock rear suspension, strong low-end torque, and highway-ready ride comfort.',
    overview:
      'The Honda Unicorn is engineered for riders who value mature styling, long-distance saddle comfort, and the added poise of a 160cc class engine paired with a rear monoshock suspension. Ideal for both daily commuting and longer highway journeys across Chhattisgarh. Contact Ankan Honda in Batauli to check availability and current price.',
    verifiedHighlights: [
      '160cc class PGM-FI engine tuned for smooth low- and mid-range torque',
      'Rear monoshock suspension for composed handling on varied road conditions',
      'Front disc brake with single-channel Anti-lock Braking System (ABS)',
      'Generous seat length and ergonomic handlebar position for fatigue-free rides',
      'Signature chrome stroke on the fuel tank and timeless silhouette',
    ],
    specifications: [
      { label: 'Vehicle Category', value: '160cc Commuter Motorcycle' },
      { label: 'Engine Class', value: '160cc Class (Nominal ~162.71 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Gearbox', value: '5-Speed Manual' },
      { label: 'Rear Suspension', value: 'Monoshock' },
      { label: 'Front Brake', value: 'Disc with Single-Channel ABS' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'Is the Honda Unicorn currently in stock at the Batauli showroom?',
      'What is the current on-road price of the Honda Unicorn?',
      'Can I request a test ride for the Honda Unicorn?',
    ],
  },
  {
    id: 'honda-dio',
    slug: 'honda-dio',
    name: 'Honda Dio',
    category: 'Scooter',
    segment: 'Sporty Moto-Scooter',
    engineClass: '110cc Class (Nominal ~109.51 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: 'Automatic (V-Matic)',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm current stock & variants with Ankan Honda, Batauli',
    featured: true,
    popularRank: 5,
    image: '/images/vehicles/honda-dio.png',
    fallbackSvg: '/images/vehicles/fallback-scooter.svg',
    shortDescription:
      'Aggressive moto-scooter styling with an apron-mounted headlamp, vibrant dual-tone graphics, and nimble automatic handling.',
    overview:
      'The Honda Dio combines the convenience of a gearless scooter with bold, youth-oriented moto-scooter design. With its signature apron-mounted headlamp, sharp body lines, and peppy 110cc class engine, the Dio stands out in everyday traffic. Contact Ankan Honda in Batauli for variant details and latest pricing.',
    verifiedHighlights: [
      'Sporty front apron styling with signature headlamp and position lamp',
      'Smooth 110cc class automatic V-Matic powertrain',
      'Telescopic front suspension and Combi Brake System (CBS)',
      'Digital meter console and external fuel lid (variant-dependent)',
      'Eye-catching dual-tone colour schemes and sporty graphics',
    ],
    specifications: [
      { label: 'Vehicle Category', value: 'Moto-Scooter' },
      { label: 'Engine Class', value: '110cc Class (Nominal ~109.51 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Transmission', value: 'Automatic (V-Matic)' },
      { label: 'Front Suspension', value: 'Telescopic' },
      { label: 'Braking System', value: 'Combi Brake System (CBS)' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'What is the current price of Honda Dio at Ankan Honda Batauli?',
      'Which colour options of the Honda Dio are available?',
      'Is Honda Dio 125 also available to enquire about at the showroom?',
    ],
  },
  {
    id: 'honda-shine-100',
    slug: 'honda-shine-100',
    name: 'Honda Shine 100',
    category: 'Motorcycle',
    segment: 'Everyday 100cc Commuter',
    engineClass: '100cc Class (Nominal ~98.98 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: '4-Speed Manual',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm current availability with Ankan Honda, Batauli',
    featured: false,
    popularRank: 6,
    image: '/images/vehicles/honda-shine100.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    shortDescription:
      'Practical, lightweight 100cc commuter motorcycle designed for easy handling, low seat height, and everyday utility.',
    overview:
      'Built with inspiration from the popular Shine family, the Honda Shine 100 focuses on accessible everyday commuting. Its lightweight chassis, long comfortable seat, and durable suspension make it well-suited for daily travel across town and village roads. Enquire with Ankan Honda in Batauli for current availability and pricing.',
    verifiedHighlights: [
      '100cc class OBD2-compliant PGM-FI engine with eSP technology',
      'Lightweight kerb weight and accessible seat height for easy manoeuvring',
      'Long, flat single-piece seat for rider comfort and practical utility',
      'Black alloy wheels and durable suspension setup for rough road patches',
      'Combi Brake System (CBS) with Equalizer',
    ],
    specifications: [
      { label: 'Vehicle Category', value: '100cc Commuter Motorcycle' },
      { label: 'Engine Class', value: '100cc Class (Nominal ~98.98 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Gearbox', value: '4-Speed Manual' },
      { label: 'Wheels', value: 'Alloy Wheels' },
      { label: 'Braking System', value: 'Drum Brakes with CBS' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'What is the on-road price of Honda Shine 100 in Batauli?',
      'Is the Honda Shine 100 currently available in stock?',
      'Can I enquire about finance options for the Shine 100?',
    ],
  },
  {
    id: 'honda-activa-125',
    slug: 'honda-activa-125',
    name: 'Honda Activa 125',
    category: 'Scooter',
    segment: 'Premium 125cc Family Scooter',
    engineClass: '125cc Class (Nominal ~123.92 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: 'Automatic (V-Matic)',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm variant availability with Ankan Honda, Batauli',
    featured: false,
    popularRank: 7,
    image: '/images/vehicles/honda-activa.png',
    fallbackSvg: '/images/vehicles/fallback-scooter.svg',
    shortDescription:
      'Step-up 125cc family scooter offering stronger pickup, premium chrome accents, and optional front disc brake variants.',
    overview:
      'For riders seeking additional power and premium features in a family scooter, the Honda Activa 125 offers a 125cc class PGM-FI engine, refined metal body panels, and multiple trim options. Contact Ankan Honda in Batauli to confirm which variants and colours of the Activa 125 can be viewed or ordered.',
    verifiedHighlights: [
      '125cc class PGM-FI engine for responsive two-up riding',
      'Durable metal body styling with signature chrome chest garnish',
      'Telescopic front suspension and 12-inch front wheel',
      'Available in Drum, Drum Alloy, Disc, and H-Smart trims (confirm stock)',
      'External fuel fill cap and multi-function switch convenience',
    ],
    specifications: [
      { label: 'Vehicle Category', value: '125cc Gearless Scooter' },
      { label: 'Engine Class', value: '125cc Class (Nominal ~123.92 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Transmission', value: 'Automatic (V-Matic)' },
      { label: 'Brake Options', value: 'Drum / Front Disc (Variant-dependent)' },
      { label: 'Front Suspension', value: 'Telescopic' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'What is the price difference between Activa 110 and Activa 125 in Batauli?',
      'Which variants of Activa 125 are available at Ankan Honda?',
      'Can I book a test ride for the Activa 125?',
    ],
  },
  {
    id: 'honda-hornet-2-0',
    slug: 'honda-hornet-2-0',
    name: 'Honda Hornet 2.0',
    category: 'Motorcycle',
    segment: 'Streetfighter Motorcycle',
    engineClass: '185cc Class (Nominal ~184.40 cc)',
    fuelType: 'Petrol (PGM-FI)',
    transmission: '5-Speed Manual (Assist & Slipper Clutch)',
    priceStatus: 'Contact dealership for latest price',
    availabilityNote: 'Confirm order / showroom availability with Ankan Honda, Batauli',
    featured: false,
    popularRank: 8,
    image: '/images/vehicles/honda-hornet.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    shortDescription:
      'Muscular street-naked motorcycle equipped with golden upside-down (USD) front forks, aggressive tank shrouds, and sporty dynamics.',
    overview:
      'The Honda Hornet 2.0 is designed for riders who want unmistakable street presence and spirited performance. With golden USD front forks, dual petal disc brakes with single-channel ABS, and a muscular fuel tank design, it stands at the sporty end of the commuter-naked line-up. Enquire with Ankan Honda in Batauli regarding availability or booking timelines.',
    verifiedHighlights: [
      '184.40cc class PGM-FI engine with Assist and Slipper Clutch',
      'Golden Upside-Down (USD) front fork and rear monoshock suspension',
      'All-LED lighting package (headlamp, winkers, and X-shaped tail lamp)',
      'Front and rear petal disc brakes with single-channel ABS',
      'Digital negative LCD instrument panel with gear position display',
    ],
    specifications: [
      { label: 'Vehicle Category', value: 'Street Naked Motorcycle' },
      { label: 'Engine Class', value: '185cc Class (Nominal ~184.40 cc)' },
      { label: 'Fuel System', value: 'PGM-FI (Programmed Fuel Injection)' },
      { label: 'Gearbox', value: '5-Speed Manual with Assist & Slipper Clutch' },
      { label: 'Front Suspension', value: 'Upside-Down (USD) Fork' },
      { label: 'Brakes', value: 'Dual Petal Discs with Single-Channel ABS' },
      { label: 'Ex-Showroom / On-Road Price', value: 'Contact dealership for latest price' },
      { label: 'Batauli Showroom Availability', value: 'Requires confirmation with showroom' },
    ],
    enquiryQuestions: [
      'Is the Honda Hornet 2.0 available or orderable at Ankan Honda Batauli?',
      'What is the latest on-road price and booking process for Hornet 2.0?',
      'Which colour options can be ordered?',
    ],
  },
];

export function getVehicleBySlug(slug) {
  return VEHICLES.find((v) => v.slug === slug || v.id === slug) || null;
}

export function getFeaturedVehicles(limit = 5) {
  return VEHICLES.filter((v) => v.featured).slice(0, limit);
}

export function getRelatedVehicles(currentSlug, category, limit = 3) {
  const sameCategory = VEHICLES.filter(
    (v) => v.slug !== currentSlug && v.category === category
  );
  const others = VEHICLES.filter(
    (v) => v.slug !== currentSlug && v.category !== category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
