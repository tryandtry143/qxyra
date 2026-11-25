import { Category, Product, Review } from '@/types';

export const categories: Category[] = [
  {
    id: 'clothings',
    name: 'Clothings',
    slug: 'clothings',
    description:
      'Bespoke tailoring, evening gowns, 450gsm heavyweight luxury hoodies, and compact combed cotton t-shirts.',
    image: '/images/clothings_editorial_banner.jpg',
    productCount: 0,
    children: [
      {
        id: 'mens',
        name: "Men's",
        slug: 'mens',
        parentId: 'clothings',
        description: 'Bespoke double-breasted Italian wool coats, silk blazers, and sartorial menswear.',
        image: '/images/wool_trench.jpg',
        productCount: 0,
      },
      {
        id: 'womens',
        name: "Women's",
        slug: 'womens',
        parentId: 'clothings',
        description: 'Sculptural pure mulberry silk evening gowns and unlined double-face cashmere coats.',
        image: '/images/silk_gown.jpg',
        productCount: 0,
      },
      {
        id: 'hoodies',
        name: 'Hoodies',
        slug: 'hoodies',
        parentId: 'clothings',
        description: '450gsm heavyweight French Terry luxury hoodies with gold hardware and boxy drape.',
        image: '/images/luxury_hoodie.jpg',
        productCount: 0,
      },
      {
        id: 'tshirts',
        name: 'T-Shirts',
        slug: 'tshirts',
        parentId: 'clothings',
        description: '280gsm compacted combed luxury tees and silk-cotton blends with drop-shoulder cut.',
        image: '/images/luxury_hoodie.jpg',
        productCount: 0,
      },
    ],
  },
  {
    id: 'perfume',
    name: 'Perfume',
    slug: 'perfume',
    description:
      'Rare olfactory extracts, 35-38% pure Extrait de Parfum concentration, distilled in Grasse with Damascus rose petals and custom engraving.',
    image: '/images/perfume_floral_banner.jpg',
    productCount: 0,
    children: [
      {
        id: 'mens',
        name: "Men's Perfume",
        slug: 'mens',
        parentId: 'perfume',
        description: 'Potent compositions of aged Cambodian Agarwood, smoked saffron, leather, and oakmoss.',
        image: '/images/perfume_flacon.jpg',
        productCount: 0,
      },
      {
        id: 'womens',
        name: "Women's Perfume",
        slug: 'womens',
        parentId: 'perfume',
        description: 'Voluptuous Bulgarian Damask Rose, Florentine Orris butter, Bourbon amber, and tonka.',
        image: '/images/perfume_floral_banner.jpg',
        productCount: 0,
      },
    ],
  },
  {
    id: 'watches',
    name: 'Watches',
    slug: 'watches',
    description:
      'Precision mechanical, automatic, and chronograph timepieces sculpted with sapphire glass, architectural cases, and heirloom straps.',
    image: '/images/watch_luxury.jpg',
    productCount: 0,
    children: [
      {
        id: 'mens',
        name: "Men's Watches",
        slug: 'mens',
        parentId: 'watches',
        description: 'Statement mechanical and chronograph timepieces in obsidian and champagne gold tone.',
        image: '/images/watch_luxury.jpg',
        productCount: 0,
      },
      {
        id: 'womens',
        name: "Women's Watches",
        slug: 'womens',
        parentId: 'watches',
        description: 'Refined slimline dress watches with luminous mother-of-pearl dials and fine bracelets.',
        image: '/images/watch_luxury.jpg',
        productCount: 0,
      },
      {
        id: 'automatic',
        name: 'Automatic',
        slug: 'automatic',
        parentId: 'watches',
        description: 'Self-winding mechanical calibers featuring exhibition sapphire casebacks.',
        image: '/images/watch_luxury.jpg',
        productCount: 0,
      },
      {
        id: 'chronograph',
        name: 'Chronograph',
        slug: 'chronograph',
        parentId: 'watches',
        description: 'Precision multi-register chronographs calibrated for collectors and connoisseurs.',
        image: '/images/watch_luxury.jpg',
        productCount: 0,
      },
    ],
  },
];

export const products: Product[] = [];

export const reviews: Review[] = [];
