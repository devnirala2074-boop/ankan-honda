# Ankan Honda — Public Dealership Website (Batauli, Chhattisgarh)

A customer-facing public dealership website built with **React 18**, **Vite**, **React Router DOM**, **Framer Motion**, **React Hook Form**, and **Lucide React** for **Ankan Honda** in Batauli, Surguja District, Chhattisgarh.

## Key Features

- **Public-Only Customer Experience:** No admin panel, login system, or unnecessary user registration.
- **Honda Brand Editorial Design:** Uses Honda Red (`#CC0000`), Deep Red (`#990000`), Charcoal Black (`#151515`), Light Gray (`#F5F5F5`), and clean responsive typography.
- **Complete Public Pages:**
  1. **Home** (`/`) — Announcement bar, sticky navbar, cinematic hero, featured vehicles, Why Choose Ankan Honda, enquiry categories, showroom introduction, transparent Google Reviews invitation, location section, and final CTA.
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

## Google Reviews Integration — Places API (New)

The website is integrated with the official **Google Places API (New) Place Details** endpoint (`GET https://places.googleapis.com/v1/places/ChIJdYLqtemRiTkRUi6ZhdHVgh0`) for:

- **Business Name:** Ankan Honda
- **Location:** Batauli, Surguja, Chhattisgarh, India
- **Verified Google Place ID:** `ChIJdYLqtemRiTkRUi6ZhdHVgh0`

### Security & Setup Instructions

To prevent exposing an unrestricted API key in public frontend code, requests are routed through the server-side proxy at [`api/google-reviews.js`](file:///e:/PROJECTS/ankan-honda-website/api/google-reviews.js) (and Vite's dev/preview server middleware in [`vite.config.js`](file:///e:/PROJECTS/ankan-honda-website/vite.config.js)):

1. Copy `.env.example` to `.env` in the project root:
   ```bash
   cp .env.example .env
   ```
2. In the **Google Cloud Console**, enable **Places API (New)** (`places.googleapis.com`).
3. Create an API key and under **API restrictions**, restrict the key exclusively to **Places API (New)**.
4. Set your key in `.env`:
   ```env
   GOOGLE_PLACE_ID=ChIJdYLqtemRiTkRUi6ZhdHVgh0
   GOOGLE_PLACES_API_KEY=your_google_places_api_new_key
   ```
5. Restart `npm run dev` (or deploy to Vercel where `/api/google-reviews` runs as a serverless function). When no API key is configured, the review section displays an honest configuration state with direct **View All Reviews on Google** and **Write a Review** links for Place ID `ChIJdYLqtemRiTkRUi6ZhdHVgh0`.

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
