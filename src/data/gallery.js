/**
 * Gallery Data — Ankan Honda, Batauli
 *
 * IMPORTANT:
 * Clearly distinguishes between official/illustrative product studio photography
 * and actual Batauli dealership photographs (which are marked as pending upload
 * until real showroom photographs are supplied, never fabricated).
 */

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Visuals' },
  { id: 'motorcycles', label: 'Motorcycle Photography' },
  { id: 'scooters', label: 'Scooter Photography' },
  { id: 'closeups', label: 'Design & Engineering Highlights' },
  { id: 'showroom', label: 'Batauli Showroom' },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-sp125-profile',
    title: 'Honda SP 125 — Athletic Commuter Profile',
    category: 'motorcycles',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-sp125.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    alt: 'Studio profile of Honda SP 125 motorcycle in metallic red with black alloy wheels and front disc brake',
    caption:
      'Sculpted tank shrouds, modern graphics, and 5-speed commuter ergonomics on the Honda SP 125. Confirm variant and colour availability at Ankan Honda, Batauli.',
    vehicleSlug: 'honda-sp-125',
  },
  {
    id: 'gal-activa-profile',
    title: 'Honda Activa — Everyday Family Scooter',
    category: 'scooters',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-activa.png',
    fallbackSvg: '/images/vehicles/fallback-scooter.svg',
    alt: 'Studio profile of Honda Activa family scooter with chrome front garnish and telescopic front suspension',
    caption:
      'Clean, timeless family scooter silhouette with comfortable floorboard space and automatic V-Matic transmission.',
    vehicleSlug: 'honda-activa',
  },
  {
    id: 'gal-hornet-street',
    title: 'Honda Hornet 2.0 — Muscular Streetfighter Stance',
    category: 'motorcycles',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-hornet.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    alt: 'Studio profile of Honda Hornet 2.0 streetfighter motorcycle featuring golden USD front forks and petal disc brakes',
    caption:
      'Aggressive street-naked styling featuring golden upside-down (USD) front forks and compact mass-forward proportions.',
    vehicleSlug: 'honda-hornet-2-0',
  },
  {
    id: 'gal-shine125-exec',
    title: 'Honda Shine 125 — Executive Commuter Poise',
    category: 'motorcycles',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-shine125.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    alt: 'Studio profile of Honda Shine 125 commuter motorcycle in black with red graphics and chrome exhaust shield',
    caption:
      'Refined 125cc executive commuter design with long single-piece seating and balanced upright ergonomics.',
    vehicleSlug: 'honda-shine-125',
  },
  {
    id: 'gal-dio-sport',
    title: 'Honda Dio — Sporty Moto-Scooter Design',
    category: 'scooters',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-dio.png',
    fallbackSvg: '/images/vehicles/fallback-scooter.svg',
    alt: 'Studio profile of Honda Dio moto-scooter with dual-tone red and charcoal bodywork and apron headlamp',
    caption:
      'Bold apron-mounted headlamp architecture and sharp dual-tone body graphics on the Honda Dio.',
    vehicleSlug: 'honda-dio',
  },
  {
    id: 'gal-unicorn-tourer',
    title: 'Honda Unicorn — 160cc Monoshock Commuter',
    category: 'motorcycles',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-unicorn.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    alt: 'Studio profile of Honda Unicorn 160cc motorcycle in pearl black with signature chrome tank garnish',
    caption:
      'Mature 160cc commuter silhouette featuring a signature chrome fuel tank accent, front ABS disc, and rear monoshock.',
    vehicleSlug: 'honda-unicorn',
  },
  {
    id: 'gal-hero-lighting',
    title: 'Night Studio Lighting & LED Headlamp Signature',
    category: 'closeups',
    categoryLabel: 'Design & Engineering Highlight',
    sourceBadge: 'Illustrative Studio Visual',
    image: '/images/vehicles/hero-motorcycle.png',
    fallbackSvg: '/images/vehicles/fallback-hero.svg',
    alt: 'Dark studio close-up highlighting red fuel tank contours and LED headlamp illumination on a Honda motorcycle',
    caption:
      'Modern Honda two-wheeler design emphasizes sharp tank lines, aerodynamic shrouds, and clear illumination.',
    vehicleSlug: 'honda-sp-125',
  },
  {
    id: 'gal-shine100-utility',
    title: 'Honda Shine 100 — Accessible Daily Utility',
    category: 'motorcycles',
    categoryLabel: 'Product Studio Photography',
    sourceBadge: 'Illustrative Product Visual',
    image: '/images/vehicles/honda-shine100.png',
    fallbackSvg: '/images/vehicles/fallback-motorcycle.svg',
    alt: 'Studio profile of Honda Shine 100 commuter motorcycle with flat seat and black alloy wheels',
    caption:
      'Lightweight, practical 100cc commuter geometry engineered for everyday ease of riding.',
    vehicleSlug: 'honda-shine-100',
  },
];
