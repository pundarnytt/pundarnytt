import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: { default: 'Pundarnytt – Oberoende. Obekvämt.', template: '%s | Pundarnytt' },
  description: 'En oberoende svensk nättidning. Nyheter, intervjuer, reportage, debatt och tydligt märkt satir och fiktion.',
  openGraph: { siteName: 'Pundarnytt', locale: 'sv_SE', type: 'website' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="sv"><body>
    <a className="skip-link" href="#innehall">Hoppa till innehållet</a>
    <header className="masthead"><Link href="/" aria-label="Pundarnytt – startsidan">PUNDARNYTT</Link><p>Oberoende. Obekvämt.</p></header>
    <nav className="main-nav" aria-label="Huvudnavigation"><Link href="/">Senaste nytt</Link><span>Nyheter · Intervjuer · Reportage · Debatt</span></nav>
    <main id="innehall">{children}</main>
    <footer><strong>PUNDARNYTT</strong><p>Oberoende. Obekvämt.</p><p>Satir och fiktiva berättelser märks alltid med SATIR respektive FIKTION.</p></footer>
  </body></html>;
}
