/**
 * Central Dealership Configuration — Ankan Honda, Batauli
 *
 * IMPORTANT:
 * Replace placeholder values below once verified by the dealership.
 * Never hardcode unverified contact details, phone numbers, or addresses
 * inside individual UI components.
 */

export const DEALERSHIP_CONFIG = {
  name: 'Ankan Honda',
  tagline: 'Honda Two-Wheeler Showroom — Batauli, Chhattisgarh',
  shortLocation: 'Batauli, Surguja District, Chhattisgarh',
  city: 'Batauli',
  district: 'Surguja',
  state: 'Chhattisgarh',
  country: 'India',
  canonicalBaseUrl: 'https://ankanhonda.in',

  // Editable Announcement Bar (do not invent discounts or financing claims)
  announcement: {
    enabled: true,
    badge: 'SHOWROOM UPDATE',
    text: 'Welcome to Ankan Honda, Batauli — Explore the Honda two-wheeler catalogue online and connect with our showroom for availability, test ride requests, and on-road price enquiries.',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  },

  // Contact Placeholders — Set `isConfigured: true` and supply verified numbers when ready
  contact: {
    // Keep empty string or null until the official dealership phone/WhatsApp number is provided.
    // Never publish a fabricated phone number in production.
    phone: '', // e.g., '+91XXXXXXXXXX' (Update with verified showroom telephone number)
    phoneDisplay: 'Phone number to be updated by showroom',
    whatsappNumber: '', // e.g., '91XXXXXXXXXX' (Digits only with country code 91, no '+')
    whatsappDisplay: 'WhatsApp number setup pending verification',
    email: '', // e.g., 'contact@ankanhonda.in'
    emailDisplay: 'Email address to be updated by showroom',
  },

  // Address & Location Placeholders
  address: {
    line1: 'Main Road, Batauli (Exact plot/landmark to be confirmed by showroom)',
    locality: 'Batauli',
    district: 'Surguja District',
    state: 'Chhattisgarh',
    pinCode: '497101',
    fullPlaceholderNote:
      'Complete street address and landmark details will be updated upon showroom confirmation.',
  },

  // Opening Hours Placeholder
  openingHours: {
    schedule: 'Showroom timings to be confirmed by dealership management',
    daysNote: 'Please contact the showroom before visiting on public holidays.',
    isConfirmed: false,
  },

  // Configurable Google Maps & Google Business Profile Links (Verified Place ID)
  googleBusiness: {
    placeId: 'ChIJdYLqtemRiTkRUi6ZhdHVgh0',
    businessName: 'Ankan Honda',
    locationLabel: 'Batauli, Surguja, Chhattisgarh, India',
    viewReviewsUrl:
      'https://search.google.com/local/reviews?placeid=ChIJdYLqtemRiTkRUi6ZhdHVgh0',
    writeReviewUrl:
      'https://search.google.com/local/writereview?placeid=ChIJdYLqtemRiTkRUi6ZhdHVgh0',
    placeUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJdYLqtemRiTkRUi6ZhdHVgh0',
  },

  maps: {
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Ankan+Honda+Batauli+Chhattisgarh&destination_place_id=ChIJdYLqtemRiTkRUi6ZhdHVgh0',
    placeSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=Ankan+Honda+Batauli+Chhattisgarh&query_place_id=ChIJdYLqtemRiTkRUi6ZhdHVgh0',
    googleReviewsUrl:
      'https://search.google.com/local/reviews?placeid=ChIJdYLqtemRiTkRUi6ZhdHVgh0',
    writeReviewUrl:
      'https://search.google.com/local/writereview?placeid=ChIJdYLqtemRiTkRUi6ZhdHVgh0',
  },

  // Social Media Links (Only verified official dealership accounts)
  social: {
    instagram: 'https://www.instagram.com/ankan_honda_batauli_/',
    facebook: '',
    youtube: '',
  },

  // Disclaimers for transparency and compliance
  disclaimers: {
    catalogueNote:
      'Vehicle images, categories, and reference specifications shown on this website are for illustrative catalogue guidance. Model availability, variant colours, features, and current ex-showroom / on-road prices in Batauli must be confirmed directly with Ankan Honda.',
    enquiryNote:
      'Submitting an online enquiry or test ride request prepares a message for the dealership and does not constitute an automatic booking or reservation confirmation.',
  },
};

/**
 * Helper to check whether a verified WhatsApp number is configured
 */
export function isWhatsAppConfigured() {
  const raw = (DEALERSHIP_CONFIG.contact.whatsappNumber || '').replace(/\D/g, '');
  return raw.length >= 10;
}

/**
 * Helper to check whether a verified phone number is configured
 */
export function isPhoneConfigured() {
  const raw = (DEALERSHIP_CONFIG.contact.phone || '').replace(/\D/g, '');
  return raw.length >= 10;
}

/**
 * Generates a properly encoded WhatsApp URL if the dealership number is configured,
 * or returns null along with the encoded message so the UI can show a transparent
 * preview / copyable message modal when the number is still a placeholder.
 */
export function buildWhatsAppLink(messageText) {
  const cleanMessage = (messageText || '').trim();
  const encodedMessage = encodeURIComponent(cleanMessage);
  const rawNumber = (DEALERSHIP_CONFIG.contact.whatsappNumber || '').replace(/\D/g, '');

  if (rawNumber.length >= 10) {
    return {
      isConfigured: true,
      url: `https://wa.me/${rawNumber}?text=${encodedMessage}`,
      shareUrl: `https://api.whatsapp.com/send?phone=${rawNumber}&text=${encodedMessage}`,
      message: cleanMessage,
    };
  }

  // Fallback when dealership WhatsApp number is not yet configured:
  // Provide a general WhatsApp share URL (lets user pick recipient in WhatsApp)
  // plus clear indication that the showroom number is pending configuration.
  return {
    isConfigured: false,
    url: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    shareUrl: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    message: cleanMessage,
  };
}

/**
 * Standardised prefilled WhatsApp message builders
 */
export const WHATSAPP_MESSAGES = {
  generalEnquiry: () =>
    `Hello Ankan Honda (Batauli),\n\nI visited your website and would like to enquire about Honda two-wheelers and showroom assistance. Please share details at your convenience.`,

  vehicleEnquiry: (vehicleName, category = '') =>
    `Hello Ankan Honda (Batauli),\n\nI am interested in the *${vehicleName}*${category ? ` (${category})` : ''}.\n\nCould you please confirm:\n1. Current availability at the Batauli showroom\n2. Latest Ex-Showroom & On-Road price\n3. Available colour variants\n\nThank you.`,

  serviceEnquiry: (serviceTitle) =>
    `Hello Ankan Honda (Batauli),\n\nI would like to enquire regarding *${serviceTitle}* at your dealership. Please let me know the process and details.\n\nThank you.`,

  testRideRequest: ({ fullName, mobile, vehicle, date, time, message }) => {
    const lines = [
      `Hello Ankan Honda (Batauli),`,
      ``,
      `I would like to request a *Test Ride*. Here are my details:`,
      `• *Name:* ${fullName}`,
      `• *Mobile:* ${mobile}`,
      `• *Preferred Vehicle:* ${vehicle}`,
      `• *Preferred Date:* ${date}`,
      `• *Preferred Time Slot:* ${time}`,
    ];
    if (message && message.trim()) {
      lines.push(`• *Additional Note:* ${message.trim()}`);
    }
    lines.push(
      ``,
      `Please let me know if this vehicle and schedule are available for a test ride at the showroom. Thank you.`
    );
    return lines.join('\n');
  },

  contactFormSubmission: ({ fullName, mobile, enquiryType, vehicleInterest, message }) => {
    const lines = [
      `Hello Ankan Honda (Batauli),`,
      ``,
      `New Customer Enquiry from Website:`,
      `• *Name:* ${fullName}`,
      `• *Mobile:* ${mobile}`,
      `• *Enquiry Category:* ${enquiryType}`,
    ];
    if (vehicleInterest && vehicleInterest.trim()) {
      lines.push(`• *Vehicle of Interest:* ${vehicleInterest.trim()}`);
    }
    if (message && message.trim()) {
      lines.push(`• *Message:* ${message.trim()}`);
    }
    lines.push(``, `Please get in touch with me. Thank you.`);
    return lines.join('\n');
  },
};
