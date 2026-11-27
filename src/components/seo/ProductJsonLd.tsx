import React from 'react';
import { Product } from '@/types';

interface ProductJsonLdProps {
  product: Product;
  url: string;
  categoryName?: string;
  categoryUrl?: string;
}

export function ProductJsonLd({
  product,
  url,
  categoryName = 'Collections',
  categoryUrl = 'https://qxyra.com/store',
}: ProductJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qxyra.com';
  const lkrPrice = Math.round(
    product.lkrSalePrice ||
      product.lkrPrice ||
      (product.salePrice || product.basePrice) * 330.41
  );

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) =>
      img.url.startsWith('/') ? `${siteUrl}${img.url}` : img.url
    ),
    description: product.seoDescription || product.description,
    sku: product.variants[0]?.sku || `QXYRA-${product.id.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Maison QXYRA',
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'LKR',
      price: lkrPrice.toString(),
      availability:
        product.variants.some((v) => v.stock > 0)
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Maison QXYRA',
      },
    },
  };

  if (product.warranty) {
    productSchema.warranty = product.warranty;
  }

  if (product.reviews && product.reviews.length > 0) {
    productSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.length.toString(),
    };
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
