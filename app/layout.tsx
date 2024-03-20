import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/providers';
import { Analytics } from '@/components/analytics';
import { cfg } from '@/utils/constants';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { LayoutFooter } from '@/components/layouts/footer';
import { LayoutHeader } from '@/components/layouts/header';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
const url = cfg.siteURL;
const siteName = cfg.siteTitle;
const description = cfg.siteDescription;

export const metadata = {
  metadataBase: url,
  url,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: cfg.siteDescription,
  openGraph: {
    siteName,
    title: siteName,
    description,
    locale: 'ja_JP',
    type: 'website',
    url,
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    creator: cfg.twitterId,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: url,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 ${fontSans.variable}`}
      >
        <Providers>
          <div className="mx-auto max-w-2xl px-4 py-10">
            <LayoutHeader />
            <main>{children}</main>
            <LayoutFooter />
          </div>
          <Analytics />
          <SpeedInsights />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
