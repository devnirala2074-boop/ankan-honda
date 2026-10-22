/**
 * Dealership Enquiry & Assistance Categories — Ankan Honda, Batauli
 *
 * All items represent customer enquiry categories. Specific service availability,
 * scheduling, third-party finance/insurance terms, and spare part stock must be
 * confirmed directly with the Batauli showroom.
 */

export const SERVICES_DATA = [
  {
    id: 'new-vehicle-enquiries',
    title: 'New Vehicle Enquiries',
    shortTitle: 'Vehicle Sales Enquiries',
    iconName: 'Bike',
    badge: 'Showroom Catalogue',
    shortDescription:
      'Enquire about Honda motorcycles and scooters, compare engine classes, check variant availability, and request current Batauli on-road price guidance.',
    detailedExplanation:
      'Looking to bring home a new Honda motorcycle or scooter in Batauli? Connect with our showroom team to discuss your daily commuting needs, compare models such as the Activa, SP 125, Shine 125, Unicorn, or Dio, and verify current showroom stock, colour options, and applicable documentation requirements.',
    whatToConfirm: [
      'Current model and colour availability at the Batauli showroom',
      'Latest Ex-Showroom and On-Road price breakup',
      'Standard accessories and registration documentation needed',
    ],
    ctaLabel: 'Enquire About New Vehicles',
  },
  {
    id: 'service-maintenance-enquiries',
    title: 'Service & Maintenance Enquiries',
    shortTitle: 'Maintenance Enquiries',
    iconName: 'Wrench',
    badge: 'Workshop Information',
    shortDescription:
      'Contact the dealership to enquire about periodic two-wheeler maintenance schedules, routine check-up availability, and workshop timings.',
    detailedExplanation:
      'Regular maintenance keeps your Honda two-wheeler performing reliably on town and rural roads. Before visiting for periodic servicing, oil changes, or general inspection, please contact Ankan Honda to confirm current workshop operational hours, service bay availability, and recommended appointment slots.',
    whatToConfirm: [
      'Workshop operating days and preferred drop-off timings',
      'Availability of periodic maintenance and inspection support',
      'Owner’s manual and service record book requirements',
    ],
    ctaLabel: 'Enquire About Maintenance',
  },
  {
    id: 'genuine-spare-parts-enquiries',
    title: 'Genuine Spare Parts Enquiries',
    shortTitle: 'Spare Parts Enquiries',
    iconName: 'Cog',
    badge: 'Parts & Consumables',
    shortDescription:
      'Check availability of Honda replacement parts, consumables, filters, brake shoes/pads, and compatible model accessories with the showroom.',
    detailedExplanation:
      'Using appropriate replacement parts helps preserve the safety and longevity of your motorcycle or scooter. Send an enquiry with your Honda model name, manufacturing year, and required part description so our team can verify stock availability or ordering options at Batauli.',
    whatToConfirm: [
      'Exact model name, variant, and manufacturing year of your vehicle',
      'Current stock status of specific replacement parts or accessories',
      'Estimated ordering timelines if a specialized part is not in stock',
    ],
    ctaLabel: 'Enquire About Spare Parts',
  },
  {
    id: 'finance-assistance-enquiries',
    title: 'Finance Assistance Enquiries',
    shortTitle: 'Finance Enquiries',
    iconName: 'Landmark',
    badge: 'Purchase Support',
    shortDescription:
      'Request information regarding available two-wheeler loan tie-ups, KYC documentation requirements, and down-payment structures at the showroom.',
    detailedExplanation:
      'If you are planning to purchase a Honda two-wheeler through financing, our showroom staff can guide you on whether third-party finance partners are available at the dealership and what identity, address, and income documents are typically required for eligibility assessment.',
    whatToConfirm: [
      'Currently active third-party bank or NBFC finance tie-ups at the showroom',
      'Standard KYC, address proof, and bank statement requirements',
      'Down-payment and EMI options (subject to financier approval and terms)',
    ],
    ctaLabel: 'Enquire About Finance Options',
  },
  {
    id: 'exchange-enquiries',
    title: 'Exchange Enquiries',
    shortTitle: 'Exchange Enquiries',
    iconName: 'ArrowLeftRight',
    badge: 'Upgrade Evaluation',
    shortDescription:
      'Ask the dealership whether existing two-wheeler evaluation and exchange assistance is available towards a new Honda motorcycle or scooter.',
    detailedExplanation:
      'Planning to upgrade from your current two-wheeler to a new Honda model? Contact Ankan Honda to check if physical vehicle inspection and exchange evaluation support is currently offered at the Batauli showroom, along with the original RC and ownership documents needed for assessment.',
    whatToConfirm: [
      'Availability of physical two-wheeler exchange evaluation at the showroom',
      'Original Registration Certificate (RC), insurance, and ID proof requirements',
      'In-person condition inspection process at Batauli',
    ],
    ctaLabel: 'Enquire About Vehicle Exchange',
  },
  {
    id: 'insurance-assistance-enquiries',
    title: 'Insurance Assistance Enquiries',
    shortTitle: 'Insurance Enquiries',
    iconName: 'ShieldCheck',
    badge: 'Policy Guidance',
    shortDescription:
      'Connect with the showroom for enquiries regarding new vehicle insurance documentation or two-wheeler policy renewal assistance.',
    detailedExplanation:
      'Valid motor insurance is mandatory for riding on public roads. Reach out to Ankan Honda to ask about insurance documentation for new vehicle deliveries or to check whether policy renewal guidance is available at the showroom counter.',
    whatToConfirm: [
      'Insurance options during new two-wheeler registration',
      'Documents needed for policy renewal enquiries (previous policy copy & RC)',
      'Coverage details subject to the respective insurance provider’s terms',
    ],
    ctaLabel: 'Enquire About Insurance',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'honda-info',
    iconName: 'Compass',
    title: 'Honda Two-Wheeler Information',
    description:
      'Explore illustrative catalogue details across popular Honda motorcycles and scooters in one clear, easy-to-navigate place before visiting the showroom.',
  },
  {
    id: 'customer-assistance',
    iconName: 'Users',
    title: 'Personalised Customer Assistance',
    description:
      'Connect directly with the Batauli showroom team to discuss suitable models for daily commuting, family use, or inter-town travel across Surguja.',
  },
  {
    id: 'test-ride-enquiries',
    iconName: 'CalendarCheck',
    title: 'Convenient Test Ride Enquiries',
    description:
      'Submit a structured test ride request online with your preferred model and schedule so the dealership can coordinate availability with you.',
  },
  {
    id: 'service-info',
    iconName: 'Wrench',
    title: 'Service & Maintenance Guidance',
    description:
      'Easily reach out to verify periodic maintenance enquiries, workshop timings, and general two-wheeler care recommendations.',
  },
  {
    id: 'genuine-parts',
    iconName: 'Shield',
    title: 'Genuine Parts & Accessories Enquiries',
    description:
      'Enquire directly with the dealership regarding model-compatible replacement parts, consumables, and standard accessories.',
  },
  {
    id: 'local-accessibility',
    iconName: 'MapPin',
    title: 'Local Presence in Batauli',
    description:
      'Dedicated to serving riders in Batauli and surrounding areas of Chhattisgarh with straightforward communication via WhatsApp, phone, or showroom visit.',
  },
];
