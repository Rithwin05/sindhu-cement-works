import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Wordmark } from './Logo';
import { PRODUCTS } from '../data/products';
import { BUSINESS, buildWhatsAppLink, WHATSAPP_CONFIGURED } from '../config/business';

export function Footer() {
  return (
    <footer className="bg-charcoal text-white" data-testid="site-footer">
      <div className="container-scw grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-smoke">
            {BUSINESS.description} Based in {BUSINESS.addressShort}.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-steel">
            Website concept — proposed design
          </p>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-safety">Products</h3>
          <ul className="mt-5 space-y-3">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                  data-testid={`footer-product-${p.slug}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-safety">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li><Link to="/" className="transition-colors hover:text-white" data-testid="footer-nav-home">Home</Link></li>
            <li><Link to="/products" className="transition-colors hover:text-white" data-testid="footer-nav-products">Products</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-white" data-testid="footer-nav-about">About Us</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-white" data-testid="footer-nav-contact">Contact</Link></li>
            <li><Link to="/privacy" className="transition-colors hover:text-white" data-testid="footer-nav-privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-safety">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-start gap-3 transition-colors hover:text-white" data-testid="footer-phone-link">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            {WHATSAPP_CONFIGURED && (
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-white"
                  data-testid="footer-whatsapp-link"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
                  WhatsApp enquiry
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
              <span>{BUSINESS.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-safety" />
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-scw flex flex-col gap-2 py-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sindhu Cement Works. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Built for the Groundwork.</p>
        </div>
      </div>
    </footer>
  );
}
