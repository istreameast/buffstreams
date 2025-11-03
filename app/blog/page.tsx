// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Buffstreams Blog — NFL, NBA, Streams Tips & Guides",
  description:
    "Official Buffstreams blog with guides for NFL, NBA, UFC/MMA, NHL, MLB, plus streaming tips and community updates.",
  alternates: { canonical: "https://buffstreams.direct/blog" },
  keywords: [
    "buffstreams",
    "buff streams",
    "buffstreams nfl",
    "nba buffstreams",
    "buffstreamz",
    "buff nfl stream",
    "buffstreams reddit",
  ],
};

export default function BlogIndex() {
  return (
    <div className="container" style={{ paddingTop: 16, paddingBottom: 32 }}>
      <h1 style={{ marginBottom: 12 }}>Buffstreams Blog</h1>
      <div className="row" style={{ gap: 16 }}>
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="section" style={{ flex: "1 1 320px" }}>
            <div style={{ padding: 12 }}>
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12, border: "1px solid var(--border)" }}
              />
              <h3 style={{ margin: "10px 0 6px" }}>{p.title}</h3>
              <p className="time" style={{ marginTop: 0 }}>{new Date(p.date).toLocaleDateString()} · {p.readingMinutes} min read</p>
              <p style={{ color: "#cfd7e1" }}>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
