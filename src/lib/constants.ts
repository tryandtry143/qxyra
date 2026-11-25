export const BRAND_NAME = 'QXYRA';
export const BRAND_FULL_NAME = 'QXYRA Haute Couture & Artisanal Parfumerie';
export const BRAND_TAGLINE = 'Luxury Clothings & Artisanal Perfumes';
export const BRAND_DESCRIPTION = 'QXYRA is an ultra-premium luxury house uniting bespoke clothings (men\'s, women\'s, luxury hoodies, and designer tees) with rare artisanal perfumes.';

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
    description: 'Men\'s tailoring, women\'s haute couture, 450gsm luxury heavyweight hoodies, and compact combed cotton t-shirts.',
    href: '/store?category=clothings',
    image: '/images/hero.jpg',
    badge: 'Luxury Apparel',
    subcategories: [
      { id: 'mens', name: "Men's", href: '/store?category=clothings&sub=mens' },
      { id: 'womens', name: "Women's", href: '/store?category=clothings&sub=womens' },
      { id: 'hoodies', name: 'Hoodies', href: '/store?category=clothings&sub=hoodies' },
      { id: 'tshirts', name: 'T-Shirts', href: '/store?category=clothings&sub=tshirts' },
    ],
  },
  {
    id: 'perfume',
    name: 'Perfume',
    shortName: 'Perfumes',
    tagline: 'Rare Olfactory Extraits & Artisanal Fragrances',
    description: 'Distinctive artisanal scents crafted for men and women with rare botanicals and complimentary crystal flacon laser engraving.',
    href: '/store?category=perfume',
    image: '/images/perfume_flacon.jpg',
    badge: 'Artisanal Perfumes',
    subcategories: [
      { id: 'mens', name: "Men's Perfume", href: '/store?category=perfume&sub=mens' },
      { id: 'womens', name: "Women's Perfume", href: '/store?category=perfume&sub=womens' },
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
    href: '/store?category=clothings',
    badge: 'Apparel',
    children: [
      {
        label: "Men's",
        href: '/store?category=clothings&sub=mens',
        description: 'Bespoke Italian virgin wool coats, structured silk blazers, and tailoring.',
      },
      {
        label: "Women's",
        href: '/store?category=clothings&sub=womens',
        description: 'Fluid obsidian silk bias evening gowns and double-face cashmere cocoon coats.',
      },
      {
        label: 'Hoodies',
        href: '/store?category=clothings&sub=hoodies',
        description: '450gsm heavyweight French Terry luxury hoodies with gold aglets and embossed crest.',
        badge: 'Trending',
      },
      {
        label: 'T-Shirts',
        href: '/store?category=clothings&sub=tshirts',
        description: '280gsm compacted combed Egyptian cotton oversized luxury minimalist tees.',
      },
    ],
  },
  {
    label: 'Perfume',
    href: '/store?category=perfume',
    badge: 'Extrait',
    children: [
      {
        label: "Men's Perfume",
        href: '/store?category=perfume&sub=mens',
        description: 'Smoky Cambodian Agarwood, Tuscan Leather, Cardamom, and Royal Mysore Sandalwood.',
      },
      {
        label: "Women's Perfume",
        href: '/store?category=perfume&sub=womens',
        description: 'Grasse Damask Rose, Florentine Orris Butter, Madagascar Vanilla, and Bourbon Amber.',
      },
    ],
  },
  { label: 'Lookbook', href: '/store?view=lookbook' },
  { label: 'Scent Finder', href: '/scent-finder' },
];

export const FOOTER_LINKS = [
  {
    title: 'Clothings',
    links: [
      { label: "Men's Clothings", href: '/store?category=clothings&sub=mens' },
      { label: "Women's Clothings", href: '/store?category=clothings&sub=womens' },
      { label: 'Luxury Hoodies', href: '/store?category=clothings&sub=hoodies' },
      { label: 'Designer T-Shirts', href: '/store?category=clothings&sub=tshirts' },
      { label: 'Autumn / Winter Lookbook', href: '/store?view=lookbook' },
    ],
  },
  {
    title: 'Perfume',
    links: [
      { label: "Men's Perfume", href: '/store?category=perfume&sub=mens' },
      { label: "Women's Perfume", href: '/store?category=perfume&sub=womens' },
      { label: 'The Scent Finder Quiz', href: '/scent-finder' },
      { label: 'Complimentary Flacon Engraving', href: '/about#engraving' },
    ],
  },
  {
    title: 'The Maison QXYRA',
    links: [
      { label: 'Our Heritage & Philosophy', href: '/about' },
      { label: 'Artisanal Craftsmanship', href: '/about#craftsmanship' },
      { label: 'Bespoke Monogramming', href: '/about#engraving' },
      { label: 'Private Client Concierge', href: '/contact' },
    ],
  },
  {
    title: 'Client Care & Terms',
    links: [
      { label: 'Worldwide White-Glove Delivery', href: '/shipping' },
      { label: 'Returns & Size Exchanges', href: '/returns' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
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
