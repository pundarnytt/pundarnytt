"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="empty"><h1>Det gick inte att hämta sidan</h1><p>Försök igen om en liten stund.</p><button onClick={reset}>Försök igen</button></div>;
}
