import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'chiselui/styles.css';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
  title: 'Marble — Digital Design Assets',
  description:
    'Marble is a curated marketplace for premium digital design assets — UI kits, templates, icon sets, and fonts for designers and developers.',
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
