import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteProvider } from '@/components/QuoteModal';
import { WhatsAppFloat, MobileActionBar } from '@/components/Actions';
import { SmoothScroll } from '@/components/SmoothScroll';
import { BUSINESS } from '@/config/business';

export const metadata: Metadata = {
  metadataBase: new URL('https://sindhu-cement-works.com'),
  title: {
    default: 'Sindhu Cement Works — RCC & Precast Concrete Products, Secunderabad',
    template: '%s | Sindhu Cement Works',
  },
  description:
    'Sindhu Cement Works, Cherlapalli, Secunderabad — RCC manhole covers, perforated drain covers, gratings and precast concrete channels for construction, drainage and infrastructure requirements. Request a quotation.',
  keywords: [
    'Sindhu Cement Works',
    'RCC manhole covers',
    'precast drain covers',
    'concrete channels',
    'precast gratings',
    'Cherlapalli',
    'Secunderabad',
    'Telangana concrete manufacturer',
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'Sindhu Cement Works',
    title: 'Sindhu Cement Works — Built for the Groundwork.',
    description:
      'RCC and precast concrete products for construction, drainage and infrastructure requirements. Cherlapalli, Secunderabad, Telangana.',
    images: [
      {
        url: '/images/products/manhole-cover.webp',
        width: 800,
        height: 600,
        alt: 'Sindhu Cement Works — RCC Precast Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sindhu Cement Works — Built for the Groundwork.',
    description:
      'RCC and precast concrete products for construction, drainage and infrastructure requirements. Cherlapalli, Secunderabad, Telangana.',
    images: ['/images/products/manhole-cover.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#181B19',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS.name,
  description: BUSINESS.description,
  telephone: BUSINESS.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 718, Rampally Road, Cherlapalli',
    addressLocality: 'Secunderabad',
    addressRegion: 'Telangana',
    postalCode: '501302',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 09:00-17:00',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-concrete text-graphite font-sans antialiased min-h-screen flex flex-col">
        <SmoothScroll />
        <QuoteProvider>
          <Header />
          <main className="flex-1 pb-[57px] md:pb-0">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <MobileActionBar />
        </QuoteProvider>
      </body>
    </html>
  );
}
