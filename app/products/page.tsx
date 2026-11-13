import type { Metadata } from 'next';
import { ProductsClient } from '@/components/ProductsClient';

export const metadata: Metadata = {
  title: 'Product Catalogue — RCC & Precast Concrete Products',
  description:
    'Browse RCC manhole covers, perforated drain covers, gratings, precast channels and custom precast products from Sindhu Cement Works, Secunderabad.',
};

export default function ProductsPage() {
  return <ProductsClient />;
}

