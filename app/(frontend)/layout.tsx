import type { Metadata } from 'next';
import Link from 'next/link';
import { Newsreader, Source_Serif_4, Space_Grotesk } from 'next/font/google';
import { Masthead } from '@/components/Masthead';
import './globals.css';

const display = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const body = Source_Serif_4({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-editorial', display: 'swap' });
const metadataFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-metadata', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: { default: 'Pundarnytt – Oberoende. Obekvämt. Obehandlat.', template: '%s | Pundarnytt' },
  description: 'En oberoende svensk nättidning. Nyheter, intervjuer, reportage, debatt och tydligt märkt satir och fiktion.',
  openGraph: { siteName: 'Pundarnytt', locale: 'sv_SE', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${display.variable} ${body.variable} ${metadataFont.variable}`}>
      <body>
        <a className="skip-link" href="#innehall">Hoppa till innehållet</a>
        <Masthead />
        <main id="innehall" className="newspaper-width">{children}</main>
        <footer className="publication-footer">
          <div className="newspaper-width footer-grid">
            <div><Link className="footer-name" href="/">PUNDARNYTT</Link><p className="footer-motto">Oberoende. Obekvämt. Obehandlat.</p></div>
            <div><h2>Om innehållet</h2><p>Journalistik, intervjuer och debatt möter satir och fiktion. Påhittade berättelser märks alltid tydligt.</p></div>
            <div className="footer-labels"><span className="type-stamp">[ SATIR ]</span><span className="type-stamp">[ FIKTION ]</span><p>Orden spelar roll.<br />Det gör märkningen också.</p></div>
          </div>
          <div className="newspaper-width footer-bottom"><span>Pundarnytt · Svensk oberoende nättidning</span><Link href="/">Till förstasidan ↑</Link></div>
        </footer>
      </body>
    </html>
  );
}
