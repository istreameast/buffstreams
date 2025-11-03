// app/layout.tsx
import '../styles/globals.css';
import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import HeaderNav from '@/components/HeaderNav';

const siteName = 'Buffstreams';
const domain = 'https://buffstreams.direct';
const highlight = '#E10601';
const GA_ID = 'G-75JY4ZJSLY'; // <- put your real GA4 ID here

export const viewport: Viewport = {
  themeColor: highlight,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: 'Buffstreams — Live Sports Streaming for NBA, NFL, Boxing, MMA, and F1',
  description:
    'Watch live streams of NBA, NFL, Boxing, MMA, and Formula 1 with Buffstreams. Clean layout, HD links, and league sections.',
  keywords: [
    'buffstreams',
    'buff streams',
    'buffstreams nfl',
    'nba buffstreams',
    'nbabuffstreams',
    'buff streams nfl',
    'buffstreamz',
    'buff nfl stream',
    'buffstream apps',
    'buffstream reddit',
    'live sports',
    'nba live',
    'nhl live',
    'mlb live',
    'ufc live',
    'mma live',
    'football streams',
    'boxing streams',
    'formula 1 streams',
  ],
  alternates: { canonical: domain },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: highlight },
    ],
  },
  openGraph: {
    type: 'website',
    url: domain,
    siteName,
    title: 'Buffstreams — Live Sports Streaming',
    description:
      'Live stream links for NBA, NFL, NHL, MLB, UFC/MMA, Boxing, and F1.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Buffstreams' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buffstreams — Live Sports Streaming',
    description:
      'Live stream links for NBA, NFL, NHL, MLB, UFC/MMA, Boxing, and F1.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  // If you added /site.webmanifest in /public, this will advertise it:
  manifest: '/site.webmanifest',
  // Ownership verifications can go here if needed:
  // verification: { google: 'xxxx', other: { me: ['https://...'] } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${domain}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: domain,
    logo: `${domain}/favicon.ico`,
    sameAs: [
      'https://twitter.com/search?q=buffstreams',
      'https://reddit.com/r/buffstreams',
    ],
    description:
      'Buffstreams provides live sports streaming links for NBA, NFL, UFC, NHL, MLB, and more.',
  };

  return (
    <html lang="en">
      <head>
        {/* GA4 */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Optional: preconnects */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>

      <body>
        <HeaderNav />
        <main className="container contentContain" style={{ marginTop: 5 }}>
          {children}
        </main>
        <footer className="footer container">
          © {new Date().getFullYear()} Buffstreams. Informational site.
        </footer>
      </body>
    </html>
  );
}
