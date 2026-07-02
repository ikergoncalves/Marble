import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'chiselui/styles.css';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  // Resolves relative Open Graph / icon URLs against the production origin.
  metadataBase: new URL(SITE_URL),
  // `default` is used on the homepage; child pages set just their own title and
  // the `template` appends the "— Marble" suffix, so it's never repeated by hand.
  title: {
    default: 'Marble — Digital Design Assets',
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Marble is a curated marketplace for premium digital design assets — UI kits, templates, icon sets, and fonts for designers and developers.',
  openGraph: {
    title: 'Marble — Digital Design Assets',
    description:
      'A curated marketplace for premium digital design assets — UI kits, templates, icon sets, and fonts for designers and developers.',
    siteName: SITE_NAME,
    url: SITE_URL,
    type: 'website',
  },
};

/**
 * Applies the persisted chiselui theme before first paint to avoid a flash of
 * the wrong color scheme. Mirrors ThemeToggle's storage key and `data-theme`
 * contract; the "system" default is handled by chiselui's own media query.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('chiselui-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>
          <div className="app-shell">
            <Header />
            <main className="app-main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
