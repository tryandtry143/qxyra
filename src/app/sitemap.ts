import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qxyra.com';
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    '',
    '/clothings',
    '/perfume',
    '/watches',
    '/store',
    '/scent-finder',
    '/about',
    '/contact',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.85,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/store/${product.slug}`,
    lastModified: product.updatedAt || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
