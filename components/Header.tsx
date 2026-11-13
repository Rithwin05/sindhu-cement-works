'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Wordmark } from './Logo';
import { useQuote } from './QuoteModal';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/#applications', label: 'Applications' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openQuote } = useQuote();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const light = scrolled || menuOpen;

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          light
            ? 'border-b border-line bg-concrete/95 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-scw flex h-16 items-center justify-between lg:h-20">
          <Link href="/" aria-label="Sindhu Cement Works — home" data-testid="header-logo-link">
            <Wordmark dark={light} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary" data-testid="desktop-nav">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                  light ? 'text-graphite/70 hover:text-graphite' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openQuote()}
              data-testid="header-request-quote-btn"
              className="hidden items-center gap-2 bg-safety px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#c35d2c] sm:inline-flex"
            >
              Request a Quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              data-testid="mobile-menu-btn"
              className={`inline-flex h-10 w-10 items-center justify-center border lg:hidden ${
                light ? 'border-line text-graphite' : 'border-white/25 text-white'
              }`}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-charcoal lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="container-scw flex h-full flex-col justify-center gap-2 pt-16">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block border-b border-white/10 py-4 text-2xl font-bold text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setMenuOpen(false);
                  openQuote();
                }}
                data-testid="mobile-menu-quote-btn"
                className="btn-primary mt-8 w-full"
              >
                Request a Quote
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

