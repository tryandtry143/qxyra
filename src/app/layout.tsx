import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { TrackingPixels } from "@/components/analytics/TrackingPixels";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";
import { BRAND_NAME, BRAND_FULL_NAME, BRAND_TAGLINE } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qxyra.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/images/qxyra_logo_navy.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/qxyra_logo_navy.png",
    apple: [
      { url: "/images/qxyra_logo_navy.png" },
    ],
  },
  title: {
    default: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: "Maison QXYRA is an ultra-premium luxury house curating bespoke menswear, women's haute couture, and rare artisanal perfumes with complimentary crystal flacon engraving.",
  keywords: [
    "QXYRA",
    "Qxyra Luxury",
    "Haute Parfumerie",
    "Niche Perfumes",
    "Extrait de Parfum",
    "Nocturne Oud",
    "Men's Haute Couture",
    "Women's Luxury Fashion",
    "Italian Wool Trench",
    "Silk Evening Gown"
  ],
  authors: [{ name: BRAND_FULL_NAME }],
  creator: BRAND_FULL_NAME,
  publisher: BRAND_FULL_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description: "Experience quiet luxury, Italian sartorial craftsmanship, and 38% artisanal perfume extraits from Maison QXYRA.",
    url: siteUrl,
    siteName: BRAND_NAME,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} Haute Couture & Parfumerie`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description: "Quiet luxury, bespoke tailoring, and rare artisanal perfumes with complimentary crystal flacon engraving.",
    creator: "@qxyra_official",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_FULL_NAME,
    url: siteUrl,
    logo: `${siteUrl}/images/qxyra_logo.jpg`,
    description: "Bespoke menswear, women's haute couture, and rare artisanal perfumes.",
    sameAs: [
      "https://instagram.com/qxyra_official",
      "https://pinterest.com/qxyra"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/images/qxyra_logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider>
          <CurrencyProvider>
            <TrackingPixels />
            {children}
            <WhatsAppFloatingButton />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
