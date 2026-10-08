# AURELIS Cosmetic Surgery - Frontend Demo

A premium cosmetic surgery clinic website built with React + Vite. This is a frontend demo only and does not include backend, authentication, database, or real booking functionality.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **GSAP + ScrollTrigger** - Cinematic scroll animations (optional)
- **CSS3** - Custom styling with responsive design

## Project Structure

```
cosmetic-clinic-01/
├── public/
│   └── assets/
│       └── hero-clinic.mp4  # Hero video (required for demo)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main application component
│   └── styles.css          # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd C:\qwen-web-lab\projects\cosmetic-clinic-01
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add hero video (optional but recommended):
   - Place your hero video at `public/assets/hero-clinic.mp4`
   - If the file is missing, the site will still work with a placeholder

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

### Build for Production

Build the optimized production bundle:
```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Features Implemented

- ✅ Fixed navigation with smooth scroll to sections
- ✅ Mobile hamburger menu (responsive)
- ✅ Cinematic hero section with video background
- ✅ Scroll-controlled text animations using GSAP + ScrollTrigger
- ✅ Procedures section with modal interactions
- ✅ Our Approach editorial layout
- ✅ Meet the Surgeon section
- ✅ Interactive Before & After slider
- ✅ Working consultation form with validation
- ✅ Success state after form submission
- ✅ Featured article section
- ✅ Final CTA section
- ✅ Footer with links and contact info
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Accessibility features (skip link, focus states, ARIA labels)

## Design System

### Colors

| Name | Hex Code | Usage |
|------|----------|-------|
| Ivory | #FDFBF7 | Primary background |
| Stone | #E8E6E1 | Secondary backgrounds |
| Graphite | #2D2D2D | Text, buttons |
| Champagne | #D4C5B0 | Accents, hover states |

### Typography

- **Serif**: Cormorant Garamond (headings)
- **Sans-serif**: Montserrat (body text)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes

- This is a frontend demo only - no backend functionality
- Form submission simulates success state (no real API calls)
- Hero video is required for the cinematic effect
- All interactions are client-side only
