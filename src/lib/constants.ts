export const BRAND_NAME = 'QXYRA';
export const BRAND_FULL_NAME = 'QXYRA Haute Couture, Parfumerie & Horlogerie';
export const BRAND_TAGLINE = 'Luxury Clothings, Perfumes & Timepieces';
export const BRAND_DESCRIPTION =
  "QXYRA is an ultra-premium luxury house uniting bespoke clothings (men's, women's, luxury hoodies, and designer tees), rare artisanal perfumes, and precision timepieces.";

export const CURRENCY_SYMBOL = '$';
export const CURRENCY_LKR_SYMBOL = 'Rs.';
export const FREE_SHIPPING_THRESHOLD = 250;
export const ITEMS_PER_PAGE = 12;

export const CATEGORIES = [
  {
    id: 'clothings',
    name: 'Clothings',
    shortName: 'Clothings',
    tagline: 'Tailored Silhouettes & Luxury Apparel',
    description:
      "Men's tailoring, women's haute couture, 450gsm luxury heavyweight hoodies, and compact combed cotton t-shirts.",
    href: '/clothings',
    image: '/images/clothings_editorial_banner.jpg',
    badge: 'Haute Couture',
    subcategories: [
      { id: 'mens', name: "Men's", href: '/clothings?sub=mens' },
      { id: 'womens', name: "Women's", href: '/clothings?sub=womens' },
      { id: 'hoodies', name: 'Hoodies', href: '/clothings?sub=hoodies' },
      { id: 'tshirts', name: 'T-Shirts', href: '/clothings?sub=tshirts' },
    ],
  },
  {
    id: 'watches',
    name: 'Watches',
    shortName: 'Watches',
    tagline: 'Haute Horlogerie & Precision Timepieces',
    description:
      'Architectural mechanical, automatic, and chronograph timepieces forged in brushed 18K champagne gold tone, sapphire crystal, and titanium.',
    href: '/watches',
    image: '/images/watch_luxury.jpg',
    badge: 'Haute Horlogerie',
    subcategories: [
      { id: 'mens', name: "Men's Watches", href: '/watches?sub=mens' },
      { id: 'womens', name: "Women's Watches", href: '/watches?sub=womens' },
      { id: 'automatic', name: 'Automatic', href: '/watches?sub=automatic' },
      { id: 'chronograph', name: 'Chronograph', href: '/watches?sub=chronograph' },
    ],
  },
  {
    id: 'perfume',
    name: 'Perfume',
    shortName: 'Perfumes',
    tagline: 'Rare Olfactory Extraits & Botanical Elixirs',
    description:
      'Distinctive artisanal scents crafted in Grasse for men and women with Damascus rose petals, aged oud, and complimentary crystal flacon engraving.',
    href: '/perfume',
    image: '/images/perfume_floral_banner.jpg',
    badge: 'Coming Soon',
    subcategories: [
      { id: 'mens', name: "Men's Perfume", href: '/perfume?sub=mens' },
      { id: 'womens', name: "Women's Perfume", href: '/perfume?sub=womens' },
    ],
  },
];

export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: { label: string; href: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: NavChildItem[];
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Clothings',
    href: '/clothings',
    badge: 'Apparel',
    children: [
      {
        label: "Men's Couture",
        href: '/clothings?sub=mens',
        description: 'Bespoke Italian virgin wool coats, structured silk blazers, and tailoring.',
      },
      {
        label: "Women's Couture",
        href: '/clothings?sub=womens',
        description: 'Fluid obsidian silk bias evening gowns and double-face cashmere coats.',
      },
      {
        label: 'Luxury Hoodies',
        href: '/clothings?sub=hoodies',
        description: '450gsm heavyweight French Terry luxury hoodies with embossed crest.',
        badge: 'Trending',
      },
      {
        label: 'Designer T-Shirts',
        href: '/clothings?sub=tshirts',
        description: '280gsm compacted combed Egyptian cotton oversized luxury tees.',
      },
    ],
  },
  {
    label: 'Watches',
    href: '/watches',
    badge: 'Horology',
    children: [
      {
        label: "Men's Timepieces",
        href: '/watches?sub=mens',
        description: 'Bold architectural cases, brushed champagne bezels, and alligator straps.',
      },
      {
        label: "Women's Timepieces",
        href: '/watches?sub=womens',
        description: 'Sculptural Slimline Mother-of-Pearl and golden link dress watches.',
      },
      {
        label: 'Automatic Calibers',
        href: '/watches?sub=automatic',
        description: 'Self-winding mechanical movements visible through exhibition sapphire backs.',
        badge: 'Heritage',
      },
      {
        label: 'Chronographs',
        href: '/watches?sub=chronograph',
        description: 'Precision tachymeter chronographs crafted for timeless collectors.',
      },
    ],
  },
  {
    label: 'Perfume',
    href: '/perfume',
    badge: 'Soon',
    children: [
      {
        label: "Men's Perfume",
        href: '/perfume?sub=mens',
        description: 'Smoky Cambodian Agarwood, Tuscan Leather, Cardamom, and Sandalwood.',
        badge: 'Coming Soon',
      },
      {
        label: "Women's Perfume",
        href: '/perfume?sub=womens',
        description: 'Grasse Damask Rose petals, Florentine Orris Butter, and Bourbon Amber.',
        badge: 'Coming Soon',
      },
      {
        label: 'Scent Finder Quiz',
        href: '/scent-finder',
        description: '60-second bespoke olfactory consultation to find your signature elixir.',
        badge: 'Interactive',
      },
    ],
  },
  { label: 'All Items', href: '/store' },
];

export const FOOTER_LINKS = [
  {
    title: 'Clothings',
    links: [
      { label: "Men's Clothings", href: '/clothings?sub=mens' },
      { label: "Women's Clothings", href: '/clothings?sub=womens' },
      { label: 'Luxury Hoodies', href: '/clothings?sub=hoodies' },
      { label: 'Designer T-Shirts', href: '/clothings?sub=tshirts' },
    ],
  },
  {
    title: 'Watches',
    links: [
      { label: "Men's Timepieces", href: '/watches?sub=mens' },
      { label: "Women's Timepieces", href: '/watches?sub=womens' },
      { label: 'Automatic Calibers', href: '/watches?sub=automatic' },
      { label: 'Luxury Chronographs', href: '/watches?sub=chronograph' },
    ],
  },
  {
    title: 'Perfume',
    links: [
      { label: "Men's Perfume (Soon)", href: '/perfume?sub=mens' },
      { label: "Women's Perfume (Soon)", href: '/perfume?sub=womens' },
      { label: 'The Scent Finder Quiz', href: '/scent-finder' },
      { label: 'Complimentary Engraving', href: '/perfume#engraving' },
    ],
  },
  {
    title: 'Client Care & Maison',
    links: [
      { label: 'All Collections', href: '/store' },
      { label: 'Worldwide Delivery', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Private Client Concierge', href: '/contact' },
    ],
  },
];

export const WHATSAPP_NUMBER = '94770000000';
export const WHATSAPP_DISPLAY_NUMBER = '+94 77 000 0000';
export const HOTLINE_PHONE = '+94 11 200 0000';
export const SUPPORT_EMAIL = 'concierge@qxyra.com';
export const STORE_ADDRESS = 'QXYRA Flagship Maison, 42 Ward Place, Colombo 00700, Sri Lanka';
export const STORE_HOURS = 'Monday – Saturday: 10:00 AM – 8:00 PM | Sunday: By Appointment';
export const STORE_MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985117576856!2d79.8656641!3d6.9146528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597987820bb1%3A0x5a18a994ef038b30!2sWard%20Pl%2C%20Colombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk';
export const STORE_MAP_DIRECTIONS_URL = 'https://maps.google.com/?q=Ward+Place,+Colombo+07,+Sri+Lanka';

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/qxyra_official' },
  { label: 'Pinterest', href: 'https://pinterest.com/qxyra' },
  { label: 'WhatsApp Concierge', href: `https://wa.me/${WHATSAPP_NUMBER}` },
];
