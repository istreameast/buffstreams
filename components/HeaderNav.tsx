'use client';

import Link from 'next/link';

const pill = 'color:#cfd7e1;padding:8px 10px;border-radius:8px;display:inline-block';

export default function HeaderNav() {
  return (
    <header className="header">
      <div className="container topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        {/* Brand → home */}
        <Link href="/" className="brand" style={{ fontSize: 20, fontWeight: 900, letterSpacing: '.2px' }}>
          Buffstreams
        </Link>

        {/* Always link to HOME with ?league=... so it works from /watch too */}
        <nav className="menu" aria-label="Primary" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/?league=NFL" style={{ ...parseStyle(pill) }}>NFL</Link>
          <Link href="/?league=SOCCER" style={{ ...parseStyle(pill) }}>Football</Link>
          <Link href="/?league=UFC" style={{ ...parseStyle(pill) }}>MMA</Link>
          <Link href="/?league=BOXING" style={{ ...parseStyle(pill) }}>Boxing</Link>
          <Link href="/?league=F1" style={{ ...parseStyle(pill) }}>Formula 1</Link>
          <Link href="/?league=NBA" style={{ ...parseStyle(pill) }}>NBA</Link>
        </nav>
      </div>
    </header>
  );
}

// small helper to inline style strings cleanly
function parseStyle(s: string) {
  return Object.fromEntries(
    s.split(';').filter(Boolean).map(kv => {
      const [k, v] = kv.split(':').map(x => x.trim());
      const jsKey = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return [jsKey, v];
    })
  ) as React.CSSProperties;
}
