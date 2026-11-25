import { Category, Product, Review } from '@/types';

export const categories: Category[] = [
  {
    id: 'clothings',
    name: 'Clothings',
    slug: 'clothings',
    description: 'Bespoke tailoring, evening gowns, 450gsm heavyweight luxury hoodies, and compact combed cotton t-shirts.',
    image: '/images/wool_trench.jpg',
    productCount: 6,
    children: [
      {
        id: 'mens',
        name: "Men's",
        slug: 'mens',
        parentId: 'clothings',
        description: 'Bespoke double-breasted Italian wool coats, silk blazers, and sartorial menswear.',
        image: '/images/wool_trench.jpg',
        productCount: 2,
      },
      {
        id: 'womens',
        name: "Women's",
        slug: 'womens',
        parentId: 'clothings',
        description: 'Sculptural pure mulberry silk evening gowns and unlined double-face cashmere cocoon coats.',
        image: '/images/silk_gown.jpg',
        productCount: 2,
      },
      {
        id: 'hoodies',
        name: 'Hoodies',
        slug: 'hoodies',
        parentId: 'clothings',
        description: '450gsm heavyweight French Terry luxury hoodies with 24K gold drawstring hardware and boxy drape.',
        image: '/images/luxury_hoodie.jpg',
        productCount: 2,
      },
      {
        id: 'tshirts',
        name: 'T-Shirts',
        slug: 'tshirts',
        parentId: 'clothings',
        description: '280gsm compacted combed luxury tees and silk-cotton blends with drop-shoulder silhouette.',
        image: '/images/luxury_hoodie.jpg',
        productCount: 2,
      },
    ],
  },
  {
    id: 'perfume',
    name: 'Perfume',
    slug: 'perfume',
    description: 'Rare olfactory extracts, 35-38% pure Extrait de Parfum concentration, distilled in Grasse with complimentary custom flacon engraving.',
    image: '/images/perfume_flacon.jpg',
    productCount: 4,
    children: [
      {
        id: 'mens',
        name: "Men's Perfume",
        slug: 'mens',
        parentId: 'perfume',
        description: 'Potent compositions of aged Cambodian Agarwood, smoked saffron, Tuscan leather, and French oakmoss.',
        image: '/images/perfume_flacon.jpg',
        productCount: 2,
      },
      {
        id: 'womens',
        name: "Women's Perfume",
        slug: 'womens',
        parentId: 'perfume',
        description: 'Voluptuous Bulgarian Damask Rose, Florentine Orris butter, Bourbon amber, and honeyed tonka.',
        image: '/images/perfume_flacon.jpg',
        productCount: 2,
      },
    ],
  },
];

export const products: Product[] = [];


export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-nocturne-oud',
    userId: 'usr-101',
    userName: 'Lord Julian V.',
    rating: 5,
    comment: 'Nocturne Oud is breathtaking. The Cambodian Oud is rich and smoky without being medicinal, perfectly balanced by the saffron and leather.',
    isVerified: true,
    createdAt: '2026-11-14T10:00:00Z',
  },
  {
    id: 'rev-2',
    productId: 'prod-hoodie-obsidian',
    userId: 'usr-102',
    userName: 'Alexander K.',
    rating: 5,
    comment: 'The 450gsm French Terry on this hoodie is incredible. Heavy, boxy structure that sits perfectly, and the gold aglets make it pure luxury.',
    isVerified: true,
    createdAt: '2026-11-16T15:30:00Z',
  },
  {
    id: 'rev-3',
    productId: 'prod-tee-oversized',
    userId: 'usr-103',
    userName: 'Marcus Sterling',
    rating: 5,
    comment: 'Best luxury tee I have ever worn. The collar never sags and the combed cotton weight is unmatched.',
    isVerified: true,
    createdAt: '2026-11-18T12:00:00Z',
  },
  {
    id: 'rev-4',
    productId: 'prod-amber-imperial',
    userId: 'usr-104',
    userName: 'Aria De Silva',
    rating: 5,
    comment: 'Ambér Impérial is pure liquid sunshine and warm tonka. The compliment factor is unbelievable.',
    isVerified: true,
    createdAt: '2026-11-19T09:15:00Z',
  },
];