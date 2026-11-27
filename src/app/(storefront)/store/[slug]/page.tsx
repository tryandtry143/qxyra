import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

import { products, reviews, categories } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Creation Not Found | Maison QXYRA',
    };
  }

  const primaryImage = product.images?.[0]?.url || '/images/watch_luxury.jpg';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qxyra.com';
  const canonicalUrl = `${siteUrl}/store/${product.slug}`;

  const defaultCategoryKeywords =
    product.categoryId === 'watches'
      ? [
          product.name,
          'Smart Watch Sri Lanka',
          'Luxury Watches Sri Lanka',
          'Maison QXYRA Watches',
        ]
      : product.categoryId === 'clothings'
      ? [product.name, 'Luxury Clothings Sri Lanka', 'Maison QXYRA Couture']
      : [product.name, 'Artisanal Parfumerie', 'Maison QXYRA'];

  return {
    title: product.seoTitle || `${product.name} | Maison QXYRA`,
    description: product.seoDescription || product.description,
    keywords: product.seoKeywords || defaultCategoryKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.seoTitle || `${product.name} | Maison QXYRA`,
      description: product.seoDescription || product.description,
      url: canonicalUrl,
      images: [
        {
          url: primaryImage.startsWith('/') ? `${siteUrl}${primaryImage}` : primaryImage,
          width: 1000,
          height: 1000,
          alt: product.images?.[0]?.alt || product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle || `${product.name} | Maison QXYRA`,
      description: product.seoDescription || product.description,
      images: [primaryImage.startsWith('/') ? `${siteUrl}${primaryImage}` : primaryImage],
    },
  };
}

export default async function StoreProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find category info
  let catName = 'Collections';
  let catHref = '/store';
  if (product.categoryId === 'clothings') {
    catName = 'Clothings';
    catHref = '/clothings';
  } else if (product.categoryId === 'perfume') {
    catName = 'Perfume';
    catHref = '/perfume';
  } else if (product.categoryId === 'watches') {
    catName = 'Watches';
    catHref = '/watches';
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ProductJsonLd
          product={product}
          url={`https://qxyra.com/store/${product.slug}`}
          categoryName={catName}
          categoryUrl={`https://qxyra.com${catHref}`}
        />

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 mb-6 sm:mb-8 font-mono overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600 shrink-0" />
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600 shrink-0" />
          <Link href={catHref} className="hover:text-brand-gold transition-colors">{catName}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600 shrink-0" />
          <span className="text-white truncate max-w-[140px] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* Top Section: High-Res Studio Gallery + Specs & Configuration + Trust Badges */}
        <div className="mb-10 sm:mb-14">
          <ProductDetailView 
            product={product} 
            catName={catName} 
            productReviewsCount={productReviews.length} 
          />
        </div>

        {/* Full Editorial Description & Structured Technical Specifications (Indexed for Google SEO) */}
        <section className="mb-12 sm:mb-16 rounded-3xl border border-white/10 bg-[#0D121D] p-5 sm:p-10 space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-400 font-semibold block">
              Product Overview &amp; Specifications
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              About {product.name}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-4xl">
            {product.description}
          </p>

          {product.technicalSpecs && product.technicalSpecs.length > 0 && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2">
              {product.technicalSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3.5 rounded-2xl bg-black/35 border border-white/5 space-y-1"
                >
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 font-semibold">
                    {spec.label}
                  </dt>
                  <dd className="text-xs sm:text-sm text-gray-200 font-light">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {/* Reviews Section */}
        <div id="reviews" className="mb-20">
          <ProductReviews productId={product.id} reviews={productReviews} rating={product.rating} />
        </div>

        {/* Related Products Section */}
        <div className="mb-12">
          <RelatedProducts currentProductId={product.id} categoryId={product.categoryId} />
        </div>
      </div>
    </div>
  );
}
