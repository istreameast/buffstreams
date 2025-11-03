// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, POSTS } from "@/lib/blog";
import Script from "next/script";
import Link from "next/link";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = `https://buffstreams.direct/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      images: [{ url: post.image }],
    },
    alternates: { canonical: url },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const url = `https://buffstreams.direct/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Buffstreams" },
    publisher: {
      "@type": "Organization",
      name: "Buffstreams",
      logo: { "@type": "ImageObject", url: "https://buffstreams.direct/favicon.ico" },
    },
    description: post.description,
    mainEntityOfPage: url,
  };

  return (
    <div className="container" style={{ paddingTop: 16, paddingBottom: 32 }}>
      <Script id="post-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <article className="section" style={{ overflow: "hidden" }}>
        <header className="sectionHead" style={{ display: "grid", gap: 6 }}>
          <nav style={{ fontSize: 12, color: "#9aa6b2" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> &nbsp;/&nbsp; <Link href="/blog" style={{ color: "inherit" }}>Blog</Link>
          </nav>
          <h1 className="sectionTitle" style={{ margin: 0 }}>{post.title}</h1>
          <div className="time" style={{ display: "flex", gap: 12 }}>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>· {post.readingMinutes} min read</span>
          </div>
        </header>
        <div style={{ padding: 12 }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12, border: "1px solid var(--border)" }}
          />
        </div>
        <div
          style={{ padding: "0 16px 20px", lineHeight: 1.75, color: "#cfd7e1" }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      <aside style={{ marginTop: 18 }}>
        <h3 style={{ margin: "10px 0" }}>More from Buffstreams Blog</h3>
        <div className="row" style={{ gap: 12 }}>
          {POSTS.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="section" style={{ flex: "1 1 260px", borderRadius: 12 }}>
              <div style={{ padding: 10 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 10, border: "1px solid var(--border)" }}
                />
                <h4 style={{ margin: "10px 0 6px" }}>{p.title}</h4>
                <p className="time">{new Date(p.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
