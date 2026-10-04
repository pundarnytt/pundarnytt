import { formatMarketValue, marketCommentary, marketDisclaimer, marketInstruments, type MarketInstrument } from '@/lib/market';
import { MarketChange } from './MarketChange';

type Props = { instruments?: readonly MarketInstrument[]; commentary?: string };

export function Pundborsen({ instruments = marketInstruments, commentary = marketCommentary }: Props) {
  return (
    <section className="pundborsen" aria-label="Pundarbörsen™">
      <div className="section-heading">
        <h2>PUNDARBÖRSEN™</h2><span>· Marknadsöversikt</span>
      </div>
      <div className="pundborsen-grid">
        <div className="market-table-scroll" role="region" aria-label="Marknadskurser" tabIndex={0}>
          <table className="market-table">
            <caption className="sr-only">Fiktiva instrument, aktuella värden och förändring jämfört med föregående värde</caption>
            <thead><tr><th scope="col">Instrument</th><th scope="col">Värde</th><th scope="col">Förändring</th></tr></thead>
            <tbody>
              {instruments.map(instrument => (
                <tr key={instrument.symbol}>
                  <th scope="row">{instrument.name}<span className="market-symbol">{instrument.symbol}</span></th>
                  <td>{formatMarketValue(instrument)}</td>
                  <td><MarketChange instrument={instrument} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="market-commentary"><h3>Marknadskommentar</h3><p>{commentary}</p></div>
      </div>
      <p className="market-disclaimer">{marketDisclaimer}</p>
    </section>
  );
}
