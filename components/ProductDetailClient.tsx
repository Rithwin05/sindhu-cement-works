'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, MessageCircle, ShieldCheck, Truck, Hammer } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Lightbox } from '@/components/Lightbox';
import { useQuote } from '@/components/QuoteModal';
import { Product, getRelated } from '@/data/products';
import { buildWhatsAppLink, WHATSAPP_CONFIGURED } from '@/config/business';

export function ProductDetailClient({ product }: { product: Product }) {
  const { openQuote } = useQuote();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const related = getRelated(product.slug);
  const gallery = product.images.map((src, i) => ({
    src,
    alt: i === 0 ? product.alt : `${product.name} — view ${i + 1}`,
    caption: `${product.name} · ${product.code}`,
  }));

  return (
    <div data-testid={`product-detail-${product.slug}`}>
      <section className="grain grid-lines bg-charcoal pb-12 pt-28 text-white lg:pb-16 lg:pt-36">
        <div className="container-scw">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-steel"
            data-testid="breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="transition-colors hover:text-white">
              Products
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-safety">{product.name}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-safety">
                {product.category} · {product.code}
              </p>
              <h1
                className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                data-testid="product-title"
              >
                {product.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => openQuote(product.slug)}
              className="btn-primary"
              data-testid="product-header-quote-btn"
            >
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-concrete py-14 lg:py-20">
        <div className="container-scw grid gap-12 lg:grid-cols-2">
          <div>
            <button
              type="button"
              onClick={() => setLightbox(active)}
              className="block w-full border border-line bg-white"
              aria-label="View product image larger"
              data-testid="product-gallery-main"
            >
              <img
                src={product.images[active]}
                alt={gallery[active].alt}
                className="aspect-square w-full object-contain p-8"
              />
            </button>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3" data-testid="product-gallery-thumbs">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={active === i}
                    data-testid={`product-thumb-${i}`}
                    className={`w-20 border bg-white p-1 transition-colors ${
                      active === i ? 'border-safety' : 'border-line hover:border-smoke'
                    }`}
                  >
                    <img src={src} alt="" className="aspect-square w-full object-contain" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              Actual product photograph · Supplied by the business
            </p>
          </div>

          <div>
            <Reveal>
              <h2 className="eyebrow text-safety">Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-graphite" data-testid="product-overview">
                {product.overview}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h3 className="eyebrow mt-10 text-safety">Intended applications</h3>
              <p className="mt-2 text-xs text-steel">Subject to confirmed specification and installation review.</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2" data-testid="product-applications">
                {product.applications.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2.5 border border-line bg-white px-4 py-3 text-[13px] font-medium text-graphite"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-safety" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openQuote(product.slug)}
                className="btn-primary flex-1"
                data-testid="product-quote-btn"
              >
                Request a Quotation <ArrowRight className="h-4 w-4" />
              </button>
              {WHATSAPP_CONFIGURED && (
                <a
                  href={buildWhatsAppLink({ product: product.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark flex-1"
                  data-testid="product-whatsapp-btn"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14 lg:py-20">
        <div className="container-scw">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl">
              Technical specifications
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel">
              Fields marked for confirmation are verified directly with Sindhu Cement Works at the time of enquiry —
              nothing here is assumed.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="mt-8 divide-y divide-line border border-line" data-testid="spec-table">
              {product.specs.map((s) => {
                const pending = /confirm|as per|subject/i.test(s.value);
                return (
                  <div key={s.label} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">{s.label}</dt>
                    <dd className={`sm:col-span-2 text-sm font-semibold ${pending ? 'text-steel' : 'text-graphite'}`}>
                      {pending && <span className="mr-2 inline-block h-1.5 w-1.5 bg-safety align-middle" />}
                      {s.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Specification first',
                text: 'Final dimensions, load class and finish are confirmed with the business before you order.',
              },
              {
                icon: Hammer,
                title: 'Variants on request',
                text: 'Available sizes and variants are shared with your quotation once your requirement is known.',
              },
              {
                icon: Truck,
                title: 'Delivery by confirmation',
                text: 'Transport availability and charges are confirmed for your project location and order size.',
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="h-full border border-line bg-concrete p-6" data-testid={`product-assurance-${i}`}>
                  <f.icon className="h-5 w-5 text-safety" />
                  <h3 className="mt-4 text-sm font-bold text-graphite">{f.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-steel">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-concrete py-14 lg:py-20">
        <div className="container-scw grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-safety">Product FAQ</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl">About this product</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <FAQAccordion items={product.faqs} testid="product-faq" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-white py-14 lg:py-20">
        <div className="container-scw">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl">Related products</h2>
            <Link
              href="/products"
              className="hidden items-center gap-1.5 text-sm font-semibold text-safety sm:inline-flex"
              data-testid="related-view-all"
            >
              Full Catalogue <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="related-products">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </div>
  );
}

