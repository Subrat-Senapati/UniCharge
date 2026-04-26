# UniCharge Web Client

This is the frontend application for UniCharge, developed with React 19 and Vite. It serves a highly responsive user interface with built-in integrations for dynamic maps, media viewing, and fast client-side routing.

## Tech Stack

- **Framework & Build**: React (v19) & Vite for optimized, speedy development.
- **Routing**: React Router DOM for structured UI navigation.
- **Styling**: Bootstrap 5, React-Bootstrap, FontAwesome, and Lucide React.
- **Maps Integrations**: Leaflet, React-Leaflet, and `@react-google-maps/api` for comprehensive location tracking and interactive map interfaces.
- **Media & Components**: LightGallery for media viewing, Slick Carousel for slider components.

## Prerequisites

- Node.js (v18+ or v22.x recommended)

## Setup & Installation

1. Navigate to the `client/web` directory (if you aren't already there):
   ```bash
   cd client/web
   ```

2. Install all the necessary dependencies:
   ```bash
   npm install
   ```

3. Environment Setup: 
   Review or create the `.env` file to include necessary keys, such as backend API URLs and Google Maps API keys.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Bundles the app for production.
- `npm run preview`: Previews the minified production build locally.
- `npm run lint`: Runs ESLint to check for code issues.
