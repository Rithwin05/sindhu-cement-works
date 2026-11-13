'use client';

import { useMemo, useState } from 'react';
import { Search, PackageSearch, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { useQuote } from '@/components/QuoteModal';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export function ProductsClient() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Products');
  const { openQuote } = useQuote();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCategory = category === 'All Products' || p.category === category;
      const inQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  const clear = () => {
    setQuery('');
    setCategory('All Products');
  };

  return (
    <div data-testid="products-page">
      <section className="grain grid-lines bg-charcoal pb-16 pt-32 text-white lg:pb-20 lg:pt-40">
        <div className="container-scw">
          <p className="eyebrow text-safety" data-testid="products-eyebrow">
            Catalogue
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" data-testid="products-title">
            Product Catalogue
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke">
            RCC and precast concrete products for construction, drainage and infrastructure. Search the range or filter by
            category, then request a quotation with your dimensions and quantities.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-scw flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products — e.g. manhole, drain, grating"
              aria-label="Search products"
              className="field-input pl-11"
              data-testid="product-search-input"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                data-testid="product-search-clear"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-graphite"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
            data-testid="category-filters"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                data-testid={`filter-${c.toLowerCase().replace(/\s+/g, '-')}`}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-150 ${
                  category === c
                    ? 'border-safety bg-safety text-white'
                    : 'border-line bg-white text-steel hover:border-graphite hover:text-graphite'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-concrete py-14 lg:py-20">
        <div className="container-scw">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-steel" data-testid="results-count">
            {results.length} product{results.length === 1 ? '' : 's'}{' '}
            {category !== 'All Products' && `· ${category}`} {query && `· “${query}”`}
          </p>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="products-grid">
              {results.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center border border-dashed border-smoke/60 bg-white px-6 py-20 text-center"
              data-testid="products-empty-state"
            >
              <PackageSearch className="h-10 w-10 text-smoke" />
              <h2 className="mt-5 text-xl font-bold text-graphite">No products match “{query}”.</h2>
              <p className="mt-2 max-w-md text-sm text-steel">
                The catalogue is focused — but custom precast requirements can often be reviewed. Clear the filters or
                send your requirement directly.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={clear}
                  className="btn-outline-dark"
                  data-testid="empty-clear-filters-btn"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => openQuote('custom-precast-products')}
                  className="btn-primary"
                  data-testid="empty-custom-enquiry-btn"
                >
                  Enquire About a Custom Product
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

