'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  FileText,
  Package,
  Phone,
  Home,
  Building2,
  Factory,
  Route,
  Search,
} from 'lucide-react';
import { Reveal, MaskedLines } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Lightbox } from '@/components/Lightbox';
import { useQuote } from '@/components/QuoteModal';
import { PRODUCTS } from '@/data/products';
import { BUSINESS } from '@/config/business';

const MARQUEE_ITEMS = [
  'RCC Manhole Covers',
  'Perforated Drain Covers',
  'Precast Gratings',
  'Concrete Channels',
  'Custom Precast',
  'Cherlapalli · Secunderabad',
];

const TRUST = [
  {
    icon: Layers,
    label: 'Product-focused catalogue',
    text: 'A clear range of RCC and precast concrete products, each with its own detail page.',
  },
  {
    icon: FileText,
    label: 'Specification-led enquiries',
    text: 'Share dimensions, quantities and technical requirements up front.',
  },
  {
    icon: Package,
    label: 'Bulk order requests',
    text: 'Built for contractors, dealers and procurement teams ordering at scale.',
  },
  {
    icon: Phone,
    label: 'Direct sales contact',
    text: 'Reach the business directly by phone, WhatsApp or the enquiry form.',
  },
];

const APPLICATIONS = [
  {
    icon: Home,
    title: 'Residential developments',
    text: 'Manhole covers, drain covers and channels for layouts, driveways and compound drainage.',
  },
  {
    icon: Building2,
    title: 'Commercial properties',
    text: 'Precast drainage and access products for commercial premises and shared infrastructure.',
  },
  {
    icon: Factory,
    title: 'Industrial premises',
    text: 'Surface drainage and precast components for industrial sites and yards.',
  },
  {
    icon: Route,
    title: 'Civil & drainage infrastructure',
    text: 'Gratings, channels and covers for municipal-style drainage and utility runs.',
  },
];

const JOURNEY = [
  {
    n: '01',
    title: 'Explore the catalogue',
    text: 'Browse the product range and open the detail page for the product you need.',
  },
  {
    n: '02',
    title: 'Review available specifications',
    text: 'Check shape, design and application notes. Confirm final values with the business.',
  },
  {
    n: '03',
    title: 'Share your requirements',
    text: 'Use the quotation form to send dimensions, quantities and your project location.',
  },
  {
    n: '04',
    title: 'Receive a quotation',
    text: 'Sindhu Cement Works reviews your requirement and responds with pricing and availability.',
  },
];

const FAQS = [
  {
    q: 'Which RCC and precast products are available?',
    a: 'The catalogue currently covers RCC manhole covers with frames, perforated RCC drain covers, RCC grating components, precast concrete channels and custom precast requirements. Each product page lists the design details that can be confirmed before ordering.',
  },
  {
    q: 'How can I request a bulk quotation?',
    a: 'Use the Request a Quote button anywhere on the site. Select your product, enter the quantity and dimensions, and submit. Your enquiry is saved with a reference number and the business responds with pricing and availability.',
  },
  {
    q: 'Can I enquire about custom dimensions?',
    a: 'Yes. Choose “Custom Precast Products” in the quotation form and describe the component, dimensions and quantity. Feasibility depends on moulds and specification, which the business will confirm.',
  },
  {
    q: 'What product specifications should I provide?',
    a: 'The most useful details are: product type, quantity, length × width × thickness, intended application (for example driveway or chamber), project city and any load or finish requirements. Approximate values are fine to start.',
  },
  {
    q: 'Can delivery be arranged to my project location?',
    a: 'Delivery availability and transport charges depend on your location and order size. Share your project city and postcode in the enquiry and the business will confirm what is possible.',
  },
  {
    q: 'How can I contact Sindhu Cement Works?',
    a: `Call ${BUSINESS.phoneDisplay}, send a WhatsApp message using the button on this site, or submit the contact form. The works are located at Cherlapalli, Secunderabad, Telangana.`,
  },
];

const GALLERY = [
  {
    src: '/images/products/manhole-cover.webp',
    alt: 'Square RCC manhole cover with supporting frame',
    caption: 'RCC Manhole Cover & Frame — finished product',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/products/drain-cover.webp',
    alt: 'Perforated RCC drain cover with elongated slots',
    caption: 'Perforated Drain Cover — profile view',
    span: '',
  },
  {
    src: '/images/products/grating.webp',
    alt: 'RCC grating components on the casting yard',
    caption: 'RCC Gratings — batch casting',
    span: '',
  },
  {
    src: '/images/products/channel.webp',
    alt: 'Precast concrete channel, end profile',
    caption: 'Precast Channel — end profile',
    span: '',
  },
  {
    src: '/images/products/channel-top.webp',
    alt: 'Elongated precast concrete component from above',
    caption: 'Precast Component — top view',
    span: '',
  },
];

export default function HomePage() {
  const { openQuote } = useQuote();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div data-testid="home-page">
      {/* A — HERO */}
      <section
        ref={heroRef}
        className="grain grid-lines relative overflow-hidden bg-charcoal text-white"
        data-testid="hero-section"
      >
        <div className="container-scw grid min-h-[92vh] items-center gap-12 pb-24 pt-32 lg:grid-cols-12 lg:pb-32 lg:pt-40">
          <motion.div style={{ y: textY }} className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow flex items-center gap-3 text-safety"
              data-testid="hero-eyebrow"
            >
              <span className="inline-block h-px w-10 bg-safety" />
              Precast Concrete Products · Telangana
            </motion.p>
            <MaskedLines
              lines={['Built for the', 'Groundwork.']}
              delay={0.15}
              className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
              data-testid="hero-headline"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-smoke sm:text-lg"
              data-testid="hero-copy"
            >
              RCC manhole covers, drainage products and precast concrete components for construction and infrastructure
              requirements.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => openQuote()}
                className="btn-primary"
                data-testid="hero-request-quote-btn"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/products" className="btn-outline-light" data-testid="hero-explore-products-btn">
                Explore Products
              </Link>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: imgY }} className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto max-w-md border border-white/10 bg-concrete p-3 lg:max-w-none"
            >
              <img
                src="/images/products/manhole-cover.webp"
                alt="Square RCC manhole cover and frame by Sindhu Cement Works"
                className="aspect-square w-full bg-white object-contain"
                data-testid="hero-product-image"
              />
              <div className="flex items-center justify-between px-2 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">SCW-MH-01</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  Sq. Cover + Frame
                </span>
              </div>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 top-8 hidden border border-safety/40 bg-charcoal px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-safety sm:block"
            >
              RCC · Precast
            </motion.span>
          </motion.div>
        </div>

        {/* Editorial marquee */}
        <div
          className="marquee-mask absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 py-4"
          data-testid="hero-marquee"
        >
          <div className="animate-marquee flex w-max items-center gap-8">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke/70"
              >
                {item} <span className="text-safety">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* B — TRUST STRIP */}
      <section className="border-b border-line bg-concrete" data-testid="trust-strip">
        <div className="container-scw grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal
              key={t.label}
              delay={i * 0.08}
              className={`flex gap-4 border-line px-2 py-8 sm:px-6 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''}`}
            >
              <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-safety" />
              <div>
                <h3 className="text-sm font-bold text-graphite">{t.label}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-steel">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* C — CATALOGUE PREVIEW */}
      <section className="bg-concrete py-20 lg:py-28" data-testid="catalogue-preview">
        <div className="container-scw">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <p className="eyebrow text-safety">Our Products</p>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl lg:text-5xl">
                Concrete products. Clear specifications.
              </h2>
              <p className="mt-4 max-w-md text-base text-steel">
                Explore the product range and find the right option for your project.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/products" className="btn-outline-dark" data-testid="catalogue-view-all-btn">
                View Full Catalogue <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6" data-testid="catalogue-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D — PRODUCT SPOTLIGHT */}
      <section className="grain relative bg-graphite py-20 text-white lg:py-28" data-testid="product-spotlight">
        <div className="container-scw grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="border border-white/10 bg-concrete p-3">
              <img
                src="/images/products/manhole-cover.webp"
                alt="RCC manhole cover and frame — product spotlight"
                loading="lazy"
                className="aspect-[4/3] w-full bg-white object-contain"
              />
              <div className="flex items-center justify-between px-2 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Product Spotlight</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">SCW-MH-01</span>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow text-safety">Spotlight — Manhole Cover & Frame</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Designed for practical infrastructure applications.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-smoke">
                Explore product details and share your required dimensions and quantities to request a quotation.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10" data-testid="spotlight-spec-list">
                {[
                  ['Dimensions', 'Confirm with manufacturer'],
                  ['Material', 'Confirm specification'],
                  ['Load rating', 'Confirm before selection'],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between py-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">{k}</span>
                    <span className="text-sm font-semibold text-white">{v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openQuote('rcc-manhole-cover')}
                className="btn-primary"
                data-testid="spotlight-enquire-btn"
              >
                Enquire About This Product <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/products/rcc-manhole-cover"
                className="btn-outline-light"
                data-testid="spotlight-details-link"
              >
                View Product Details
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* E — APPLICATIONS */}
      <section
        id="applications"
        className="border-b border-line bg-concrete py-20 lg:py-28"
        data-testid="applications-section"
      >
        <div className="container-scw">
          <Reveal>
            <p className="eyebrow text-safety">Applications</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl lg:text-5xl">
              Made for the requirements of the site.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPLICATIONS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.07}>
                <div
                  className="group h-full border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-safety"
                  data-testid={`application-card-${i}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-line bg-concrete transition-colors group-hover:border-safety">
                    <a.icon className="h-5 w-5 text-graphite" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-graphite">{a.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-steel">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xs leading-relaxed text-steel" data-testid="applications-disclaimer">
              Final product suitability depends on the confirmed specification and intended installation. Describe your
              application in the enquiry and the business will advise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* F — PROCUREMENT JOURNEY */}
      <section className="bg-white py-20 lg:py-28" data-testid="journey-section">
        <div className="container-scw">
          <Reveal>
            <p className="eyebrow text-safety">Why use this website to source products?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl lg:text-5xl">
              From product discovery to quotation.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j, i) => (
              <Reveal key={j.n} delay={i * 0.08} className="bg-white">
                <div className="flex h-full flex-col p-7" data-testid={`journey-step-${i}`}>
                  <span className="font-mono text-2xl font-semibold text-safety">{j.n}</span>
                  <h3 className="mt-5 text-base font-bold text-graphite">{j.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-steel">{j.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* G — GALLERY */}
      <section className="border-y border-line bg-concrete py-20 lg:py-28" data-testid="gallery-section">
        <div className="container-scw">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <Reveal>
              <p className="eyebrow text-safety">Gallery</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl lg:text-5xl">
                See the product beyond the catalogue.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm text-steel">
                Finished products, profiles and casting views — photographed from the actual product range.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4" data-testid="gallery-grid">
            {GALLERY.map((g, i) => (
              <button
                key={g.src + i}
                type="button"
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden border border-line bg-white ${g.span}`}
                aria-label={`View larger: ${g.caption}`}
                data-testid={`gallery-item-${i}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04] ${
                    g.span ? 'h-full min-h-[16rem]' : 'aspect-square'
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-charcoal/85 px-3 py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-smoke opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {g.caption}
                </span>
              </button>
            ))}
            <div
              className="col-span-2 flex items-center justify-center border border-dashed border-smoke/60 bg-concrete px-6 py-6 text-center lg:col-span-3"
              data-testid="gallery-placeholder"
            >
              <p className="text-xs text-steel">
                Manufacturing, curing and dispatch photographs will be added here —{' '}
                <span className="font-mono uppercase tracking-[0.15em]">replaceable placeholder</span>
              </p>
            </div>
          </div>
        </div>
        <Lightbox
          images={GALLERY.map((g) => ({ src: g.src, alt: g.alt, caption: g.caption }))}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      </section>

      {/* H — CUSTOM / BULK */}
      <section className="grain grid-lines relative bg-charcoal py-20 text-white lg:py-28" data-testid="custom-section">
        <div className="container-scw grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-safety">Custom & Bulk Requirements</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Have a specific requirement?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke">
              Share your required product, dimensions, quantity and project location. Our team can review the details
              and advise on quotation availability.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:text-right">
            <button
              type="button"
              onClick={() => openQuote('custom-precast-products')}
              className="btn-primary"
              data-testid="custom-requirement-btn"
            >
              Discuss Your Requirement <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
              Contractors · Dealers · Builders · Procurement
            </p>
          </Reveal>
        </div>
      </section>

      {/* I — FAQ */}
      <section className="bg-concrete py-20 lg:py-28" data-testid="faq-section">
        <div className="container-scw grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-safety">FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">
              Questions, answered honestly.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              Straight answers about products, quotations and enquiries. Anything unresolved — ask directly.
            </p>
            <button
              type="button"
              onClick={() => openQuote()}
              className="btn-outline-dark mt-8"
              data-testid="faq-ask-btn"
            >
              Ask a Question <Search className="h-4 w-4" />
            </button>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <FAQAccordion items={FAQS} testid="home-faq" />
          </Reveal>
        </div>
      </section>

      {/* J — FINAL CTA */}
      <section className="border-t border-line bg-white py-20 lg:py-28" data-testid="final-cta-section">
        <div className="container-scw text-center">
          <Reveal>
            <p className="eyebrow text-safety">Get Started</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl lg:text-5xl">
              Planning your next concrete requirement?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-steel">
              Share your product requirements and request a quotation.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openQuote()}
                className="btn-primary"
                data-testid="final-cta-quote-btn"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/contact" className="btn-outline-dark" data-testid="final-cta-contact-btn">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

