# Sindhu Cement Works — Premium Industrial B2B Platform

A modern, high-performance B2B product catalogue and quotation platform for **Sindhu Cement Works** (Cherlapalli, Secunderabad, Telangana). Built with Next.js App Router, Tailwind CSS, TypeScript, and Framer Motion.

## Tech Stack
- **Framework:** Next.js (App Router, Server & Client Components)
- **Styling:** Tailwind CSS + Radix UI Primitives + Custom Industrial Design System
- **Animations:** Framer Motion + Lenis Smooth Scrolling
- **Language:** TypeScript
- **Icons:** Lucide React
- **Backend / API:** Next.js Route Handlers (`app/api/`)
- **Database:** MongoDB driver with resilient in-memory fallback for offline/development mode

## Project Structure
```
sindhu-cement-works/
├── app/
│   ├── api/
│   │   ├── contact/route.ts         # POST /api/contact -> message submission & MSG-XXXXXX ref
│   │   ├── enquiries/
│   │   │   ├── [reference]/route.ts # GET /api/enquiries/:ref -> lookup enquiry
│   │   │   └── route.ts             # POST /api/enquiries -> quotation enquiry & SCW-XXXXXX ref
│   │   ├── health/route.ts          # GET /api/health -> healthcheck
│   │   └── route.ts                 # GET /api -> API info
│   ├── about/page.tsx               # About Us page
│   ├── contact/page.tsx             # Contact page with enquiry form & Google Maps
│   ├── privacy/page.tsx             # Privacy Policy page
│   ├── products/
│   │   ├── [slug]/page.tsx          # Dynamic product detail page with static params
│   │   └── page.tsx                 # Full product catalogue with live search & filters
│   ├── globals.css                  # Custom tokens, blueprint grid, & marquee animations
│   ├── layout.tsx                   # Root layout, Google Fonts (Manrope & JetBrains Mono), JSON-LD
│   └── page.tsx                     # Homepage (Hero, Trust Strip, Bento Grid, Spotlight, FAQ)
├── components/                      # Modular UI components (Header, Footer, Lightbox, QuoteModal, etc.)
├── config/
│   └── business.ts                  # Centralized business info (contact, address, hours, WhatsApp generator)
├── data/
│   └── products.ts                  # Verified RCC & precast product catalogue
├── lib/
│   ├── db.ts                        # MongoDB connection & fallback store
│   └── utils.ts                     # Tailwind class merging utility
└── public/                          # Static assets, WebP product images, favicon, robots.txt, sitemap.xml
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local` if connecting to MongoDB:
```bash
MONGODB_URI=mongodb://localhost:27017
DB_NAME=sindhu_cement_works
```
*(Note: If no MongoDB instance is present, the app gracefully falls back to an in-memory store so quotation generation and contact forms work out of the box).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
