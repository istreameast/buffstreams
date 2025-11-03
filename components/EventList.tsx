import Link from 'next/link';
import { isExpired, isLive, type EventItem } from '../lib/stream';
import {
  FILTER_ORDER,
  normalizeLeague,
  type LeagueKey,
  LEAGUE_ICONS,
  LEAGUE_TITLES,
} from '../lib/league';

function fmtTime(ts?: number, when?: string) {
  if (ts) {
    const d = new Date(ts * 1000);
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
  return when || '';
}

function LeagueBlock({ league, events }: { league: LeagueKey | string; events: EventItem[] }) {
  if (!events.length) return null;
  const title = (LEAGUE_TITLES as any)[league] || league;
  const icon = LEAGUE_ICONS[(league as LeagueKey)] || '';

  return (
    <section className="section">
      <div className="tourHead">
        {icon ? (
          <span>
            <img
              src={icon}
              width={24}
              height={24}
              alt={`${league} icon`}
              style={{ borderRadius: 6, display: 'block' }}
            />
          </span>
        ) : null}
        <h2 className="league-name">Upcoming {title} Streams Links</h2>
      </div>

      <ul className="competitions">
        {events.map((ev) => {
          const live = isLive(ev);
          const hd = ev.hds?.[0] ?? ev.streams?.[0]?.hd ?? 0;
          const playerUrl = ev.streams?.[0]?.link ?? '#';
          const to = `/watch/${hd}?u=${encodeURIComponent(playerUrl)}&t=${encodeURIComponent(
            ev.title || 'Live Stream'
          )}&lg=${encodeURIComponent(String(league))}`;

          const parts = (ev.title || '').split(' - ');
          const home = parts[0] || ev.title;
          const away = parts[1] || '';

          return (
            <li key={`${ev.id}-${hd}-${ev.title}`}>
              <Link className="competition" href={to} title={`${home} vs ${away}`}>
                <span className="comp-table">
                  <span className="comp-side comp-left">
                    <span className="name">{home}</span>
                  </span>

                  <span className="comp-center">
                    {live ? (
                      <b className="live-color">LIVE</b>
                    ) : (
                      <time className="kickoff">{fmtTime(ev.ts_et, ev.when_et)}</time>
                    )}
                  </span>

                  <span className="comp-side comp-right">
                    <span className="name">{away}</span>
                  </span>
                </span>

                <span className="btn-ss">Live Streams</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function EventList({ events }: { events: EventItem[] }) {
  const visible = events.filter((e) => !isExpired(e));
  if (!visible.length) return <div className="err">No events available right now.</div>;

  // Group by normalized league
  const groups = new Map<string, EventItem[]>();
  for (const e of visible) {
    const k = normalizeLeague(e.league);
    const key = (k === 'OTHER' ? 'SOCCER' : k) as string;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(e);
  }

  // ORDER: show core leagues first, then Soccer last
  const order: string[] = [...FILTER_ORDER, 'SOCCER'];
  const others = [...groups.keys()].filter((k) => !order.includes(k));
  const keys = [...order, ...others].filter((k) => (groups.get(k) ?? []).length);

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      {keys.map((k) => (
        <LeagueBlock key={k} league={k as LeagueKey} events={groups.get(k)!} />
      ))}
    </div>
  );
}
