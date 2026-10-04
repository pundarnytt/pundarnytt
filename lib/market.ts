export type MarketInstrument = {
  symbol: string;
  name: string;
  value: number;
  previousValue: number;
  unit?: string;
};

// Fixed editorial data for v0.1. Future snapshots can supply the same shape.
export const marketInstruments: readonly MarketInstrument[] = [
  { symbol: 'PUND', name: 'Pundindex™', value: 420.69, previousValue: 405.12 },
  { symbol: 'PANT', name: 'Pant/SEK', value: 1, previousValue: 1 },
  { symbol: 'KOPPAR', name: 'Koppar', value: 184.2, previousValue: 169.5 },
  { symbol: 'BILLYS', name: 'Billys-index', value: 24.95, previousValue: 25.25, unit: 'SEK' },
  { symbol: 'KÄLLARE', name: 'Källarindex', value: 98.4, previousValue: 100 },
];

export const marketCommentary = 'Koppar öppnar starkt efter obekräftade uppgifter om en obevakad kabeltrumma utanför Borås. Samtidigt är pantmarknaden stabil.';
export const marketDisclaimer = 'Pundarbörsen™ är ett satiriskt index. Siffrorna är påhittade och ska inte användas som finansiell rådgivning.';

const numberFormat = new Intl.NumberFormat('sv-SE', {
  minimumFractionDigits: 2, maximumFractionDigits: 2,
});

export function formatMarketValue(instrument: MarketInstrument) {
  return `${numberFormat.format(instrument.value)}${instrument.unit ? ` ${instrument.unit}` : ''}`;
}

export function marketChange({ value, previousValue }: MarketInstrument) {
  // A percentage relative to zero is undefined, not an unchanged quote.
  if (previousValue === 0) return { direction: 'unavailable', symbol: '—', text: 'Ej beräkningsbar', label: 'Förändring kan inte beräknas från ett tidigare värde på noll' };
  const percent = ((value - previousValue) / previousValue) * 100;
  const text = `${numberFormat.format(Math.abs(percent))}%`;
  if (percent > 0) return { direction: 'up', symbol: '▲', text, label: `Upp ${text}` };
  if (percent < 0) return { direction: 'down', symbol: '▼', text, label: `Ned ${text}` };
  return { direction: 'unchanged', symbol: '→', text, label: `Oförändrat ${text}` };
}
