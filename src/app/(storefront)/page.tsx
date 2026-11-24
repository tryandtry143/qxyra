import { Metadata } from 'next';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';
import { GatewayHero } from '@/components/home/GatewayHero';
import { ShopTheLook } from '@/components/home/ShopTheLook';
import { StorePreview } from '@/components/home/StorePreview';
import { LabsShowcase } from '@/components/home/LabsShowcase';
import { BrandStory } from '@/components/home/BrandStory';
import { TrustBadges } from '@/components/home/TrustBadges';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${BRAND_TAGLINE} — Official Maison`,
  description: `${BRAND_NAME} is an ultra-premium luxury house curating bespoke menswear, women's haute couture, and rare artisanal perfumes with complimentary crystal flacon engraving.`,
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-[#070A0F] text-white">
      {/* 1. Flagship Dual Division Split Hero */}
      <GatewayHero />

      {/* 2. Interactive "Shop The Look" Editorial Hotspots */}
      <ShopTheLook />

      {/* 3. Store Collection Preview (Fashion & Haute Parfumerie) */}
      <StorePreview />

      {/* 4. Interactive Olfactory Atelier & Flacon Engraving Experience */}
      <LabsShowcase />

      {/* 5. Brand Story & Craftsmanship Philosophy */}
      <BrandStory />

      {/* 6. Trust Badges & White-Glove Guarantees */}
      <TrustBadges />
    </div>
  );
}
