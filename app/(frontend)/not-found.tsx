import Link from 'next/link';
export default function NotFound() {
  return <div className="empty"><h1>Sidan finns inte</h1><p>Artikeln eller kategorin kan ha flyttats eller tagits bort.</p><Link href="/">Till senaste nytt</Link></div>;
}
