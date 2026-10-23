import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useQuote } from './QuoteModal';

export function ProductCard({ product, index = 0 }) {
  const { openQuote } = useQuote();
  return (
    <article
      className="group flex h-full flex-col border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-safety"
      data-testid={`product-card-${product.slug}`}
    >
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-concrete"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          {String(index + 1).padStart(2, '0')} / {product.code}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-safety">{product.category}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-graphite">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-safety">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">{product.summary}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-graphite transition-colors hover:text-safety"
            data-testid={`product-view-${product.slug}`}
          >
            View Product <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => openQuote(product.slug)}
            className="text-[13px] font-semibold text-safety transition-colors hover:text-[#c35d2c]"
            data-testid={`product-quote-${product.slug}`}
          >
            Request Pricing
          </button>
        </div>
      </div>
    </article>
  );
}
