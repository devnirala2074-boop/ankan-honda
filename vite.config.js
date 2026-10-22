import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchGooglePlaceReviews } from './api/google-reviews.js';

/**
 * Vite Dev & Preview Middleware for `/api/google-reviews`
 * Keeps `GOOGLE_PLACES_API_KEY` on the server side during local development
 * and preview without exposing it in client bundle code.
 */
function googlePlacesApiMiddleware(mode) {
  return {
    name: 'ankan-honda-google-places-proxy',
    configureServer(server) {
      server.middlewares.use('/api/google-reviews', async (req, res) => {
        const env = loadEnv(mode, process.cwd(), '');
        const apiKey =
          env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';
        const placeId =
          env.GOOGLE_PLACE_ID ||
          process.env.GOOGLE_PLACE_ID ||
          'ChIJdYLqtemRiTkRUi6ZhdHVgh0';

        const result = await fetchGooglePlaceReviews(apiKey, placeId);
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body));
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/google-reviews', async (req, res) => {
        const env = loadEnv(mode, process.cwd(), '');
        const apiKey =
          env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';
        const placeId =
          env.GOOGLE_PLACE_ID ||
          process.env.GOOGLE_PLACE_ID ||
          'ChIJdYLqtemRiTkRUi6ZhdHVgh0';

        const result = await fetchGooglePlaceReviews(apiKey, placeId);
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body));
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: '/ankan-honda/',
  plugins: [react(), googlePlacesApiMiddleware(mode)],
  server: {
    port: 5173,
    open: false,
  },
}));
