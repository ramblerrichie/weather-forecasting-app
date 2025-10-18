# Weather Forecasting App

React single-page app that fetches current weather conditions from the OpenWeatherMap API. Users can search for any city and see temperature, humidity, and wind speed alongside an icon that matches the reported weather.

## Prerequisites

- Node.js ≥ 18 (LTS recommended)
- An OpenWeatherMap API key

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   ```bash
   cp .env.example .env   # or create .env manually
   ```
   Set `VITE_API_ID` inside `.env` to your OpenWeatherMap API key:
   ```dotenv
   VITE_API_ID=your_api_key_here
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open the printed URL (default `http://localhost:5173`) to use the app. Search for any city to load its weather snapshot.

## Available Scripts

- `npm run dev` – start Vite in development mode with fast hot reloading.
- `npm run build` – produce an optimized production build.
- `npm run preview` – serve the production build locally.
- `npm run lint` – run ESLint with the configured React rules (`eslint.config.js`).

## Project Structure

```
.
├── public/                 # Static assets served as-is
├── src/
│   ├── App.jsx             # Root component that renders the weather UI
│   ├── index.css           # Global styles
│   ├── components/
│   │   ├── Weather.jsx     # Weather widget logic and layout
│   │   └── Weather.css     # Component-specific styling
│   └── assets/             # Weather icons used by the UI
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration (flat config)
```

## Notes

- The `Weather` component fetches data from OpenWeatherMap using the configured API key and shows a default city on load (currently `Hong Kong`).
- API failures (network issues, invalid city name) surface user-friendly alerts in the UI; check the browser console for debug logs.
- To change the initial city, update the `search('Hong Kong')` call inside `src/components/Weather.jsx`.

## Deployment Tips

1. Run `npm run build` to generate production assets in `dist/`.
2. Deploy the contents of `dist/` to any static hosting provider (e.g., Netlify, Vercel, GitHub Pages).
3. Ensure `VITE_API_ID` is present in the environment when building so Vite can inline the key; use your host’s environment variable configuration if available.

