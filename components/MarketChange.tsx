import { marketChange, type MarketInstrument } from '@/lib/market';

export function MarketChange({ instrument }: { instrument: MarketInstrument }) {
  const change = marketChange(instrument);
  return (
    <span className={`market-change market-change-${change.direction}`}>
      <span aria-hidden="true">{change.symbol} {change.text}</span>
      <span className="sr-only">{change.label}</span>
    </span>
  );
}
