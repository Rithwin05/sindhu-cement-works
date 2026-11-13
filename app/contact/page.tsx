import type { Metadata } from 'next';
import { ContactClient } from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Sindhu Cement Works, Cherlapalli, Secunderabad',
  description:
    'Call, WhatsApp or write to Sindhu Cement Works, Plot No. 718, Rampally Road, Cherlapalli, Secunderabad, Telangana 501302. Mon–Sat, 9 AM–5 PM.',
};

export default function ContactPage() {
  return <ContactClient />;
}

