import Link from 'next/link';
import { getCategories } from '@/lib/cms';
import { PrimaryNavigation } from './PrimaryNavigation';

export async function Masthead() {
  const categories = await getCategories();
  const today = new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Stockholm',
  }).format(new Date());

  return (
    <header className="publication-header">
      <div className="edition-strip">
        <div className="newspaper-width edition-strip-inner">
          <span>{today}</span>
          <span className="edition-mark">Svensk oberoende nättidning</span>
        </div>
      </div>
      <div className="newspaper-width">
        <div className="masthead">
          <div className="masthead-register" aria-hidden="true">
            <span>Från verkligheten</span><span>Och strax utanför</span>
          </div>
          <Link className="masthead-name" href="/" aria-label="Pundarnytt – startsidan">PUNDARNYTT</Link>
          <p>Oberoende. Obekvämt. Obehandlat.</p>
        </div>
        <PrimaryNavigation categories={categories.map(({ id, name, slug }) => ({ id, name, slug }))} />
      </div>
    </header>
  );
}
