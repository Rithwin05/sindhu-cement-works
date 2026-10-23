# Sindhu Cement Works — Premium Industrial Website Demo

## Original problem statement
Build a presentation-ready, premium B2B product catalogue + lead-generation website for Sindhu Cement Works (RCC & precast concrete products, Cherlapalli, Secunderabad, Telangana) to show the business owner. Requirements: full homepage (hero "Built for the Groundwork.", trust strip, catalogue preview, product spotlight, applications, procurement journey, gallery, custom/bulk CTA, FAQ, final CTA, footer), /products with live search + category filters, 5 product detail pages with spec tables, multi-step quotation builder with validation + enquiry reference, WhatsApp integration with real number, About, Contact with map, mobile bottom action bar, strict no-fabrication credibility rules, SEO basics, responsive + accessible.

## User-supplied business data (verified by owner via chat, Oct 2026)
- Phone / WhatsApp: +91 93478 23457
- Address: Plot No. 718, Rampally Road, Cherlapalli, Secunderabad, Telangana 501302
- Hours: Mon–Sat 9:00 AM – 5:00 PM
- Business self-description: "Manholes and precast products manufacturer with quality and durability"
- 5 real product photos (in /app/frontend/public/images/products/)

## Architecture
- Frontend: React 19 (CRA/craco) + Tailwind + framer-motion + lenis. Brand tokens: graphite #252925, charcoal #181B19, concrete #F5F3EE, safety orange #D96C36. Manrope + JetBrains Mono.
- Backend: FastAPI + MongoDB (motor). POST /api/enquiries (validated, returns SCW-XXXXXX reference), GET /api/enquiries/{ref}, POST /api/contact (MSG-XXXXXX), /api/health.
- Data: /app/frontend/src/data/products.js (5 structured products); /app/frontend/src/config/business.js (all contact config centralised).

## Implemented (Oct 23, 2026)
- All homepage sections A–K, kinetic masked hero reveal, parallax product panel, editorial marquee, bento catalogue grid, spotlight, applications, journey, gallery + lightbox, custom/bulk CTA, FAQ accordion, final CTA, footer.
- /products with live search, 6 category filters, empty state with clear/custom-enquiry actions.
- 5 product detail pages: breadcrumbs, gallery + thumbs + lightbox, overview, applications, spec table (unknowns marked "Confirm with manufacturer"), related products, per-product FAQ, quote + WhatsApp CTAs carrying product context.
- 4-step quotation modal: validation per step, field-level errors, data preserved, duplicate-submit guard, consent checkbox, enquiry reference + WhatsApp continuation on success. Saved to MongoDB (verified SCW-5F0B12).
- Contact page: validated form → MongoDB (verified MSG-3C76E0), phone/WhatsApp/address/hours, Google Maps embed + directions link.
- About page with provisional copy; Privacy page. SEO: per-page titles/descriptions, canonical, OG, JSON-LD LocalBusiness, robots.txt, sitemap.xml, favicon SVG logo mark.
- Mobile: full-screen menu, bottom action bar (Quote + WhatsApp), no horizontal overflow at 375/768/1366. Reduced-motion respected.

## Backlog
- P0: Owner review of the demo; collect real spec values (dimensions, load classes, MOQ, pricing policy) to replace "Confirm with manufacturer" fields.
- P1: Email notification to owner on new enquiry (Resend integration); factory/team photography for About + gallery placeholder tile.
- P1: Email address for the business (not yet supplied).
- P2: Admin enquiries inbox page (view saved enquiries); Telugu language toggle; Google Business Profile link once confirmed.

## Test credentials
No authentication in scope. See /app/memory/test_credentials.md.
