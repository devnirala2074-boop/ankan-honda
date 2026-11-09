# Ankan Honda — Public Dealership Website (Batauli, Chhattisgarh)

A customer-facing public dealership website built with **React 18**, **Vite**, **React Router DOM**, **Framer Motion**, **React Hook Form**, and **Lucide React** for **Ankan Honda** in Batauli, Surguja District, Chhattisgarh.

## Key Features

- **Public-Only Customer Experience:** No admin panel, login system, or unnecessary user registration.
- **Honda Brand Editorial Design:** Uses Honda Red (`#CC0000`), Deep Red (`#990000`), Charcoal Black (`#151515`), Light Gray (`#F5F5F5`), and clean responsive typography.
- **Complete Public Pages:**
  1. **Home** (`/`) — Announcement bar, sticky navbar, cinematic hero, featured vehicles, Why Choose Ankan Honda, enquiry categories, showroom introduction, official Google Business Profile section, location section, and final CTA.
  2. **Bikes & Scooters** (`/vehicles`) — Searchable, filterable, and sortable vehicle catalogue across Motorcycles and Scooters.
  3. **Vehicle Details** (`/vehicles/:slug`) — Reusable detail page with studio visual, overview, reference specifications, highlights, one-click WhatsApp questions, test ride link, and related models.
  4. **Test Ride Request** (`/test-ride`) — Validated form (Indian 10-digit mobile number validation, past-date rejection, duplicate-submission prevention) that generates a pre-formatted WhatsApp test ride enquiry.
  5. **Services** (`/services`) — Information & enquiry portal covering New Vehicle Enquiries, Service & Maintenance, Genuine Spare Parts, Finance, Exchange, and Insurance enquiries.
  6. **About Us** (`/about`) — Factual showroom introduction, customer assistance philosophy, location details, and visual gallery preview.
  7. **Gallery** (`/gallery`) — Responsive visual showcase with category filtering, source distinction badges, and a keyboard-accessible Lightbox (`Escape`, `ArrowLeft`, `ArrowRight`).
  8. **Contact Us** (`/contact`) — Centralised contact placeholders, interactive WhatsApp enquiry form, Google Maps directions, and FAQs.

## Updating Showroom Contact Details

All dealership contact information is stored in one central file:

- `src/config/dealership.js`

Update `phone`, `whatsappNumber`, `email`, `address.line1`, `openingHours.schedule`, and `maps.directionsUrl` in `src/config/dealership.js` once verified by the dealership.

## Development & Deployment

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
