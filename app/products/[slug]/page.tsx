import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProduct } from '@/data/products';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} — Specifications & Quotation`,
    description: `${product.summary} Available from Sindhu Cement Works, Cherlapalli, Secunderabad. Request a quotation with your dimensions and quantity.`,
    openGraph: {
      title: `${product.name} | Sindhu Cement Works`,
      description: product.summary,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

