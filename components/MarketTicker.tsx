import { formatMarketValue, marketInstruments, type MarketInstrument } from '@/lib/market';
import { MarketChange } from './MarketChange';

export function MarketTicker({ instruments = marketInstruments }: { instruments?: readonly MarketInstrument[] }) {
  return (
    <section className="market-ticker" aria-label="Pundarbörsen™ – satiriska marknadskurser" tabIndex={0}>
      <span className="market-ticker-label">Pundarbörsen™</span>
      <ul>
        {instruments.map(instrument => (
          <li key={instrument.symbol}>
            <span className="market-ticker-name">{instrument.name}</span>
            <span>{formatMarketValue(instrument)}</span>
            <MarketChange instrument={instrument} />
          </li>
        ))}
      </ul>
    </section>
  );
}
