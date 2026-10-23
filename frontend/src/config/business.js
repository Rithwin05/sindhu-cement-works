// Centralised business configuration — edit here before launch.
// Phone / WhatsApp / address supplied by the business owner (Google listing, July 2026).
export const BUSINESS = {
  name: 'Sindhu Cement Works',
  shortName: 'SCW',
  tagline: 'Built for the Groundwork.',
  description:
    'RCC and precast concrete products for construction, drainage and infrastructure requirements.',
  phoneDisplay: '+91 93478 23457',
  phoneHref: 'tel:+919347823457',
  whatsappNumber: '919347823457',
  address: 'Plot No. 718, Rampally Road, Cherlapalli, Secunderabad, Telangana 501302',
  addressShort: 'Cherlapalli, Secunderabad, Telangana',
  hours: 'Mon – Sat · 9:00 AM – 5:00 PM',
  hoursNote: 'Confirm holiday hours by phone before visiting.',
  mapsEmbed:
    'https://maps.google.com/maps?q=Plot%20No%20718%20Rampally%20Road%20Cherlapalli%20Secunderabad%20Telangana%20501302&t=&z=14&ie=UTF8&iwloc=&output=embed',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=Plot%20No%20718%20Rampally%20Road%20Cherlapalli%20Secunderabad%20Telangana%20501302',
};

export const WHATSAPP_CONFIGURED = Boolean(BUSINESS.whatsappNumber);

export function buildWhatsAppLink({ product, quantity, dimensions, location, notes } = {}) {
  const lines = [
    `Hello Sindhu Cement Works, I am interested in ${product || 'your RCC / precast concrete products'}.`,
    '',
  ];
  if (quantity) lines.push(`Quantity: ${quantity}`);
  if (dimensions) lines.push(`Required dimensions: ${dimensions}`);
  if (location) lines.push(`Project location: ${location}`);
  if (notes) lines.push(`Additional requirements: ${notes}`);
  lines.push('', 'Please share the quotation and available specifications.');
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;
