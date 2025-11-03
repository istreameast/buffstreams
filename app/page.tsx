// app/page.tsx
import Link from 'next/link';
import EventList from '../components/EventList';
import { fetchEvents } from '../lib/pulsematch';
import type { ApiResponse, EventItem } from '../lib/stream';
import { normalizeLeague, type LeagueKey } from '../lib/league';

export default async function Page({
  searchParams,
}: {
  searchParams?: { league?: string };
}) {
  let items: EventItem[] = [];
  try {
    const data: ApiResponse = await fetchEvents();
    items = (data.days || []).flatMap((d) => d.items || []);
  } catch (e) {
    console.error(e);
  }

  // Apply league filter if provided
  const q = (searchParams?.league || '').toUpperCase() as LeagueKey | '';
  const filtered = q ? items.filter((e) => normalizeLeague(e.league) === q) : items;

  // FAQ JSON-LD (helps long-tail & rich results)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Buffstreams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Buffstreams is an informational hub that lists links to live sports streams for NBA, NFL, NHL, MLB, CFB, UFC/MMA and soccer. Choose a game and launch the HD player from the event list.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Buffstreams free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Browsing schedules and opening external stream links is free. We do not host or store any media files.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I watch NFL on Buffstreams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Open the NFL filter or visit the NFL section, pick a matchup, then start a link. On the watch page you can use theater or full-screen mode, and optionally add YouTube chat via the ?yt= parameter.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Buffstreams have an app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We are web-first. You can add this site to your home screen (PWA style) for a fast app-like experience.',
        },
      },
    ],
  };

  return (
    <div className="row" style={{ gap: 16 }}>
      {/* Main column */}
      <div className="col-md-8" style={{ flex: '1 1 700px', minWidth: 0 }}>
        <EventList events={filtered} />

        {/* ---------- SEO CONTENT START ---------- */}
        <section className="section" style={{ marginTop: 10 }}>
          <div className="sectionHead">
            <h1 className="sectionTitle">
              Buffstreams — Live Sports Streaming for NBA, NFL, Boxing, MMA, and F1
            </h1>
          </div>

          <div style={{ padding: '14px 16px', lineHeight: 1.7, color: '#cfd7e1' }}>
            <p style={{ marginTop: 0 }}>
              <strong>Buffstreams</strong> (also searched as <strong>buff streams</strong>,{' '}
              <strong>buffstreamz</strong>, and <strong>nbabuffstreams</strong>) is your simple hub
              to discover live sports links across the biggest leagues. Use the filters to jump
              straight to{' '}
              <Link href="/?league=NBA" title="NBA live on Buffstreams">
                NBA live
              </Link>
              ,{' '}
              <Link href="/?league=NFL" title="Buffstreams NFL live">
                buffstreams NFL live
              </Link>
              , <Link href="/?league=NHL">NHL live</Link>, <Link href="/?league=MLB">MLB live</Link>
              , <Link href="/?league=CFB">CFB</Link> or <Link href="/?league=UFC">UFC/MMA</Link>.
            </p>

            <h2 style={{ marginTop: 18 }}>Why fans choose Buffstreams</h2>
            <ul>
              <li>
                <strong>Fast event discovery:</strong> find games by league or team and launch a
                player with one click.
              </li>
              <li>
                <strong>Mobile-first:</strong> optimized layout; watch page supports theater &
                full-screen.
              </li>
              <li>
                <strong>Simple player:</strong> pass <code>?yt=</code> to enable optional YouTube
                chat while you watch.
              </li>
              <li>
                <strong>Always up-to-date:</strong> schedules refresh from our live feed throughout
                the day.
              </li>
            </ul>

            <h2>Popular sections</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                gap: 10,
              }}
            >
              <Link className="badge" href="/?league=NBA" title="NBA Buffstreams">
                NBA Buffstreams
              </Link>
              <Link className="badge" href="/?league=NFL" title="Buff NFL stream">
                Buff NFL Stream
              </Link>
              <Link className="badge" href="/?league=NHL" title="NHL Buffstreams">
                NHL Buffstreams
              </Link>
              <Link className="badge" href="/?league=MLB" title="MLB Buffstreams">
                MLB Buffstreams
              </Link>
              <Link className="badge" href="/?league=CFB" title="CFB Buffstreams">
                CFB Buffstreams
              </Link>
              <Link className="badge" href="/?league=UFC" title="UFC / MMA Buffstreams">
                UFC / MMA Buffstreams
              </Link>
            </div>

            <h2 style={{ marginTop: 18 }}>Search terms we cover</h2>
            <p>
              Fans often search for: <strong>buffstreams</strong>, <strong>buff streams</strong>,{' '}
              <strong>buffstreams nfl</strong>, <strong>nba buffstreams</strong>,{' '}
              <strong>buff streams nfl</strong>, <strong>nbabuffstreams</strong>,{' '}
              <strong>buffstreamz</strong>, <strong>buff nfl stream</strong>,{' '}
              <strong>buffstream apps</strong>, and <strong>buffstreams reddit</strong>. This site
              helps you navigate those intents quickly with league filters and clear schedules.
            </p>

            <h2>How to watch safely</h2>
            <ol>
              <li>Use trusted devices and keep your browser up to date.</li>
              <li>Enable an ad-blocker if your region permits it.</li>
              <li>Open only the links you intend to watch and close pop-ups immediately.</li>
            </ol>

            <h2>FAQ</h2>
            <details>
              <summary>
                <strong>What is Buffstreams?</strong>
              </summary>
              <p>
                Buffstreams is an informational index of live sports links. We don’t host or store
                any video content; we simply help you find games faster.
              </p>
            </details>
            <details>
              <summary>
                <strong>Is it free?</strong>
              </summary>
              <p>Yes. Browsing schedules and opening third-party links is free.</p>
            </details>
            <details>
              <summary>
                <strong>Is there a Buffstreams app?</strong>
              </summary>
              <p>
                We are web-first. For a fast app-like experience, add this site to your home screen.
              </p>
            </details>
          </div>
<script
  type="application/ld+json"
  // eslint-disable-next-line react/no-danger
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Buffstreams',
      url: 'https://buffstreams.direct',
      logo: 'https://buffstreams.direct/apple-touch-icon.png',
    }),
  }}
/>

          {/* FAQ JSON-LD for rich results */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </section>
        {/* ---------- SEO CONTENT END ---------- */}
      </div>

      {/* Sidebar */}
      <div className="col-md-4" style={{ flex: '0 1 360px' }}>
        <div className="sidebarCard" style={{ marginTop: 15 }}>
          <div className="header">
            <h3 className="title" style={{ padding: '10px 14px' }}>Blog</h3>
          </div>
          <div className="body" style={{ padding: '10px 12px' }}>
            <Link
              href="/blog/buffstreams-nfl-live-watch-sunday-football-in-hd"
              className="card bg-dark mb-3 blog-item"
              style={{ display: 'block', marginBottom: 12 }}
            >
              <img
                className="card-img-top"
                src="https://www.cloudwards.net/wp-content/uploads/2022/09/How-to-Watch-the-NFL-Live-Stream.png"
                alt="Buffstreams NFL Live"
              />
              <div className="card-body">
                <h5 className="card-title">Buffstreams NFL Live — Watch Sunday Football in HD</h5>
              </div>
            </Link>

            <Link
              href="/blog/nba-buffstreams-complete-guide-to-live-basketball"
              className="card bg-dark mb-3 blog-item"
              style={{ display: 'block', marginBottom: 12 }}
            >
              <img
                className="card-img-top"
                src="https://media.contentapi.ea.com/content/dam/ea/nba-live-mobile/nba-live-mobile-s4/news/common/nba-live-mobile-feature-image-keyart.png.adapt.crop191x100.628p.png"
                alt="NBA Buffstreams"
              />
              <div className="card-body">
                <h5 className="card-title">NBA Buffstreams — Complete Guide</h5>
              </div>
            </Link>

            <Link
              href="/blog/buffstreamz-safe-alternatives-and-apps-for-buffstreams"
              className="card bg-dark mb-3 blog-item"
              style={{ display: 'block', marginBottom: 12 }}
            >
              <img
                className="card-img-top"
                src="https://www.cloudwards.net/wp-content/uploads/2025/10/Best-BuffStreams-Alternative.png"
                alt="Buffstreamz Alternatives"
              />
              <div className="card-body">
                <h5 className="card-title">Buffstreamz — Alternatives & Apps</h5>
              </div>
            </Link>

            <Link
              href="/blog/buffstreams-reddit-community-tips-and-live-thread-etiquette"
              className="card bg-dark mb-3 blog-item"
              style={{ display: 'block' }}
            >
              <img
                className="card-img-top"
                src="https://redditinc.com/hubfs/Reddit%20Inc/Blog/Imported_Blog_Media/reddit_header_2023-11-28-222257_hthh.png"
                alt="Buffstreams Reddit"
              />
              <div className="card-body">
                <h5 className="card-title">Buffstreams Reddit — Tips & Etiquette</h5>
              </div>
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <Link
            href="/blog"
            style={{ display: 'inline-block', padding: 7, margin: '0 5px', border: '1px solid', borderRadius: 7 }}
          >
            All Blog Posts
          </Link>
          <a
            style={{ display: 'inline-block', padding: 7, margin: '0 5px', border: '1px solid', borderRadius: 7 }}
            href="#"
          >
            PFL World Championship
          </a>
        </div>
      </div>
    </div>
  );
}
