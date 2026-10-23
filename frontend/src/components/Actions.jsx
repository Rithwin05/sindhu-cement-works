import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { buildWhatsAppLink, WHATSAPP_CONFIGURED } from '../config/business';
import { useQuote } from './QuoteModal';

export function WhatsAppFloat() {
  if (!WHATSAPP_CONFIGURED) return null;
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sindhu Cement Works on WhatsApp"
      data-testid="whatsapp-float"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lg shadow-charcoal/25 transition-transform duration-200 hover:scale-105 md:flex"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function MobileActionBar() {
  const { openQuote } = useQuote();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-concrete md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      data-testid="mobile-action-bar"
    >
      <button
        onClick={() => openQuote()}
        className="flex items-center justify-center gap-2 bg-safety py-4 text-sm font-semibold text-white"
        data-testid="mobile-bar-quote-btn"
      >
        Request Quote <ArrowUpRight className="h-4 w-4" />
      </button>
      {WHATSAPP_CONFIGURED ? (
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-charcoal py-4 text-sm font-semibold text-white"
          data-testid="mobile-bar-whatsapp-btn"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      ) : (
        <span className="flex items-center justify-center gap-2 bg-charcoal py-4 text-sm font-semibold text-white/50">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </span>
      )}
    </div>
  );
}
