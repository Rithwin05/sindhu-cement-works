import type { Metadata } from 'next';
import { AboutClient } from '@/components/AboutClient';

export const metadata: Metadata = {
  title: 'About Us — Sindhu Cement Works, Cherlapalli, Secunderabad',
  description:
    'Sindhu Cement Works supplies RCC and precast concrete products — manhole covers, drain covers, gratings and channels — from Cherlapalli, Secunderabad, Telangana.',
};

export default function AboutPage() {
  return <AboutClient />;
}

