// Structured product catalogue. Specification values are pending confirmation
// from Sindhu Cement Works — unknown fields are marked, never invented.
const IMG = '/images/products';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  code: string;
  image: string;
  images: string[];
  alt: string;
  summary: string;
  overview: string;
  applications: string[];
  specs: ProductSpec[];
  faqs: ProductFaq[];
}

export const CATEGORIES: string[] = [
  'All Products',
  'Manhole Covers',
  'Drain Covers',
  'Gratings',
  'Channels',
  'Custom Precast',
];

export const PRODUCTS: Product[] = [
  {
    slug: 'rcc-manhole-cover',
    name: 'RCC Manhole Cover & Frame',
    category: 'Manhole Covers',
    code: 'SCW-MH-01',
    image: `${IMG}/manhole-cover.webp`,
    images: [`${IMG}/manhole-cover.webp`],
    alt: 'Square RCC manhole cover with circular patterned top and matching concrete frame',
    summary:
      'Square reinforced cement concrete manhole cover supplied with a matching frame for inspection chambers and utility access points.',
    overview:
      'A square RCC manhole cover cast with a patterned top surface and supplied together with its supporting frame. Suited to inspection chambers and utility access points in construction and infrastructure work. Share your required size, quantity and installation context and the business will confirm available specifications and a quotation.',
    applications: [
      'Inspection and utility chambers in residential layouts',
      'Drainage and sewerage access points',
      'Commercial and industrial premises',
      'Municipal and civil infrastructure works',
    ],
    specs: [
      { label: 'Product code', value: 'SCW-MH-01' },
      { label: 'Shape & design', value: 'Square cover with frame, patterned top surface' },
      { label: 'Dimensions', value: 'Confirm with manufacturer' },
      { label: 'Material', value: 'Reinforced cement concrete — confirm mix specification' },
      { label: 'Reinforcement', value: 'Confirm with manufacturer' },
      { label: 'Load classification', value: 'Confirm before selection' },
      { label: 'Finish', value: 'Confirm with manufacturer' },
      { label: 'Minimum order quantity', value: 'Confirm with manufacturer' },
      { label: 'Delivery', value: 'Confirm availability for your location' },
    ],
    faqs: [
      {
        q: 'What sizes are available for this manhole cover?',
        a: 'Available dimensions need to be confirmed directly with Sindhu Cement Works. Share your chamber size or required clear opening in the enquiry form and the team will advise.',
      },
      {
        q: 'Is the cover supplied with the frame?',
        a: 'The product is presented as a cover with a supporting frame. Confirm the exact supply scope, quantity pricing and availability when you request a quotation.',
      },
      {
        q: 'Can this cover be used in traffic-bearing areas?',
        a: 'Load classification must be confirmed with the business before selection. Describe the intended installation location in your enquiry so the team can advise on suitability.',
      },
    ],
  },
  {
    slug: 'perforated-rcc-drain-cover',
    name: 'Perforated RCC Drain Cover',
    category: 'Drain Covers',
    code: 'SCW-DC-02',
    image: `${IMG}/drain-cover.webp`,
    images: [`${IMG}/drain-cover.webp`],
    alt: 'Rectangular precast concrete drain cover with four elongated drainage slots',
    summary:
      'Rectangular RCC drain cover with elongated openings for surface water drainage along pathways, premises and site edges.',
    overview:
      'A rectangular precast concrete drain cover cast with elongated openings that allow surface water to pass into the drain below while covering the channel. Commonly used along pathways, compound edges and drainage runs. Share your drain width, required length coverage and quantity to request pricing.',
    applications: [
      'Storm-water drainage along pathways and driveways',
      'Compound and premises edge drains',
      'Industrial site surface drainage',
      'Residential layout drainage runs',
    ],
    specs: [
      { label: 'Product code', value: 'SCW-DC-02' },
      { label: 'Shape & design', value: 'Rectangular slab with elongated drainage slots' },
      { label: 'Dimensions', value: 'Confirm with manufacturer' },
      { label: 'Material', value: 'Reinforced cement concrete — confirm mix specification' },
      { label: 'Reinforcement', value: 'Confirm with manufacturer' },
      { label: 'Load classification', value: 'Confirm before selection' },
      { label: 'Minimum order quantity', value: 'Confirm with manufacturer' },
      { label: 'Delivery', value: 'Confirm availability for your location' },
    ],
    faqs: [
      {
        q: 'How do I choose the right drain cover size?',
        a: 'Measure your drain channel width and the total run length. Share both in your enquiry — the business will confirm which available size fits and how many pieces you need.',
      },
      {
        q: 'Are these covers suitable for vehicle crossings?',
        a: 'Load suitability depends on the verified specification. Confirm the load classification with Sindhu Cement Works before installing in any vehicle-bearing area.',
      },
    ],
  },
  {
    slug: 'rcc-grating',
    name: 'RCC Grating Components',
    category: 'Gratings',
    code: 'SCW-GR-03',
    image: `${IMG}/grating.webp`,
    images: [`${IMG}/grating.webp`],
    alt: 'Multiple narrow precast RCC grating components arranged on a casting yard floor',
    summary:
      'Narrow precast concrete grating members for drainage covers, screening and site infrastructure assemblies.',
    overview:
      'Narrow precast RCC grating components produced in repeatable lengths for drainage and screening assemblies. Well suited to projects that need consistent, uniform members across a run. Share the section size, length and total quantity required for a quotation.',
    applications: [
      'Drainage grating assemblies',
      'Screening and ventilation openings',
      'Site and compound infrastructure',
      'Repeat-member precast requirements',
    ],
    specs: [
      { label: 'Product code', value: 'SCW-GR-03' },
      { label: 'Shape & design', value: 'Narrow elongated precast grating members' },
      { label: 'Dimensions', value: 'Confirm with manufacturer' },
      { label: 'Material', value: 'Reinforced cement concrete — confirm mix specification' },
      { label: 'Reinforcement', value: 'Confirm with manufacturer' },
      { label: 'Minimum order quantity', value: 'Confirm with manufacturer' },
      { label: 'Delivery', value: 'Confirm availability for your location' },
    ],
    faqs: [
      {
        q: 'Can gratings be ordered in bulk quantities?',
        a: 'Yes — bulk and repeat orders are the intended use. Share your total quantity, section size and project location in the quotation form and the team will respond with availability.',
      },
      {
        q: 'Are custom lengths possible?',
        a: 'Custom dimensions may be possible depending on mould availability. Send your required length and section through the custom requirement option and the business will confirm.',
      },
    ],
  },
  {
    slug: 'precast-concrete-channel',
    name: 'Precast Concrete Channel',
    category: 'Channels',
    code: 'SCW-CH-04',
    image: `${IMG}/channel.webp`,
    images: [`${IMG}/channel.webp`, `${IMG}/channel-top.webp`],
    alt: 'Channel-shaped precast concrete component with smooth curved inner profile',
    summary:
      'Channel-profile precast concrete component for drainage runs, cable routes and infrastructure lining requirements.',
    overview:
      'A channel-profile precast concrete component with a smooth formed inner surface, used to line drainage runs and similar infrastructure routes. Supplied in repeatable precast lengths. Share your required channel size, total run length and project location for pricing.',
    applications: [
      'Surface water drainage channels',
      'Cable and utility route lining',
      'Irrigation and site water runs',
      'Infrastructure edge channels',
    ],
    specs: [
      { label: 'Product code', value: 'SCW-CH-04' },
      { label: 'Shape & design', value: 'Channel (U-profile) precast section' },
      { label: 'Dimensions', value: 'Confirm with manufacturer' },
      { label: 'Material', value: 'Reinforced cement concrete — confirm mix specification' },
      { label: 'Reinforcement', value: 'Confirm with manufacturer' },
      { label: 'Minimum order quantity', value: 'Confirm with manufacturer' },
      { label: 'Delivery', value: 'Confirm availability for your location' },
    ],
    faqs: [
      {
        q: 'What channel sizes can be supplied?',
        a: 'Available channel sections and lengths need confirmation from the business. Share your required width, depth and total run in the enquiry form for a clear answer.',
      },
      {
        q: 'Can channels be paired with drain covers?',
        a: 'A channel run can be covered with the perforated RCC drain covers where sizes align. Send both requirements together and the team will confirm compatibility.',
      },
    ],
  },
  {
    slug: 'custom-precast-products',
    name: 'Custom Precast Products',
    category: 'Custom Precast',
    code: 'SCW-CU-05',
    image: `${IMG}/channel-top.webp`,
    images: [`${IMG}/channel-top.webp`],
    alt: 'Elongated precast concrete component photographed from above, example of custom precast capability',
    summary:
      'Precast concrete components produced to project-specific dimensions and profiles, subject to mould and specification confirmation.',
    overview:
      'Beyond the standard catalogue, Sindhu Cement Works can review project-specific precast requirements — special dimensions, profiles or repeat components for your site. Feasibility depends on mould availability and specification, so share a drawing, photograph or clear dimensions with your enquiry.',
    applications: [
      'Project-specific precast components',
      'Non-standard dimensions and profiles',
      'Repeat site components in bulk',
      'Dealer and contractor special orders',
    ],
    specs: [
      { label: 'Product code', value: 'SCW-CU-05' },
      { label: 'Shape & design', value: 'To project requirement — share drawing or photo' },
      { label: 'Dimensions', value: 'As per confirmed requirement' },
      { label: 'Material', value: 'Reinforced cement concrete — confirm mix specification' },
      { label: 'Feasibility', value: 'Subject to mould and specification review' },
      { label: 'Minimum order quantity', value: 'Confirm with manufacturer' },
      { label: 'Delivery', value: 'Confirm availability for your location' },
    ],
    faqs: [
      {
        q: 'How do I enquire about a custom precast product?',
        a: 'Use the quotation form and choose “Other / custom product”. Describe the component, dimensions and quantity — a reference drawing or photo description helps the business respond accurately.',
      },
      {
        q: 'Is every custom design possible?',
        a: 'Not necessarily. Feasibility depends on moulds, dimensions and specification. The business will review your requirement and advise honestly before quoting.',
      },
    ],
  },
];

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getRelated = (slug: string, count = 3): Product[] =>
  PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);

