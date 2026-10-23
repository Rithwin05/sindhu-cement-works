import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Package, BadgeCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/Reveal';
import { useQuote } from '../components/QuoteModal';
import { PRODUCTS } from '../data/products';
import { BUSINESS } from '../config/business';

const SEGMENTS = ['Contractors & civil engineers', 'Builders & developers', 'Dealers & distributors', 'Government / EPC procurement', 'Individual buyers'];

export default function AboutPage() {
  const { openQuote } = useQuote();
  return (
    <div data-testid="about-page">
      <SEO
        title="About Us — Sindhu Cement Works, Cherlapalli, Secunderabad"
        description="Sindhu Cement Works supplies RCC and precast concrete products — manhole covers, drain covers, gratings and channels — from Cherlapalli, Secunderabad, Telangana."
      />

      <section className="grain grid-lines bg-charcoal pb-16 pt-32 text-white lg:pb-24 lg:pt-40">
        <div className="container-scw grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-safety">About Us</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" data-testid="about-title">
              Concrete work, presented straight.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke" data-testid="about-intro">
              Sindhu Cement Works is presented here as a supplier of RCC and precast concrete products for construction and infrastructure requirements. Contact the business to confirm product specifications, availability and quotation details.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
              Website concept — provisional copy, to be verified with the business before launch
            </p>
          </div>
          <div className="flex items-end lg:col-span-5">
            <blockquote className="border-l-2 border-safety pl-6" data-testid="about-quote">
              <p className="text-xl font-bold leading-snug text-white sm:text-2xl">
                “Manholes and precast products manufacturer with quality and durability.”
              </p>
              <cite className="mt-4 block font-mono text-[11px] uppercase not-italic tracking-[0.2em] text-steel">
                — Sindhu Cement Works, Cherlapally
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-concrete py-16 lg:py-24">
        <div className="container-scw grid gap-10 lg:grid-cols-3">
          <Reveal>
            <div className="h-full border border-line bg-white p-7" data-testid="about-focus">
              <Package className="h-5 w-5 text-safety" />
              <h2 className="mt-4 text-lg font-bold text-graphite">Product focus</h2>
              <ul className="mt-4 space-y-2.5">
                {PRODUCTS.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className="text-sm font-medium text-graphite underline-offset-4 transition-colors hover:text-safety hover:underline">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full border border-line bg-white p-7" data-testid="about-segments">
              <Users className="h-5 w-5 text-safety" />
              <h2 className="mt-4 text-lg font-bold text-graphite">Who we supply</h2>
              <ul className="mt-4 space-y-2.5">
                {SEGMENTS.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-steel">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-safety" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="h-full border border-line bg-white p-7" data-testid="about-quality">
              <BadgeCheck className="h-5 w-5 text-safety" />
              <h2 className="mt-4 text-lg font-bold text-graphite">Quality approach</h2>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                Manufacturing process, material specification and quality practices will be documented here once confirmed with the business. Until then, every specification on this site is marked for confirmation — nothing is claimed that cannot be verified.
              </p>
              <p className="mt-4 flex items-start gap-2.5 text-sm text-steel">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
                {BUSINESS.address}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grain grid-lines bg-graphite py-16 text-white lg:py-24">
        <div className="container-scw flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Talk to the works about your requirement.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
              Send your product, dimensions and quantity — the business responds with availability and pricing.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => openQuote()} className="btn-primary" data-testid="about-quote-btn">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/contact" className="btn-outline-light" data-testid="about-contact-btn">Contact Us</Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
