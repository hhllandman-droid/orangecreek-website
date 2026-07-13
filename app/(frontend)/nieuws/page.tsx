import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/components/landing/SiteFooter'
import { SiteHeader } from '@/components/landing/SiteHeader'
import { formatDutchDate } from '@/lib/format'
import { getNewsList } from '@/lib/news'
import { NEWS_CATEGORY_LABELS } from '@/lib/news-articles'
import '@/styles/landing.css'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Nieuws & inzichten — Orange Creek Capital',
  description:
    'Scherpe analyses vanuit first principles over zorg, vastgoed, inrichting, technologie en de bredere PE- en VC-trends waarin Orange Creek kansen ziet.',
}

export default async function NieuwsPage() {
  const articles = await getNewsList()

  return (
    <div className="news-page">
      <SiteHeader />

      <section className="news-page-hero">
        <div className="news-page-hero-glow" />
        <div className="news-page-hero-inner">
          <span className="landing-label" style={{ color: '#e8935f' }}>
            Nieuws &amp; inzichten
          </span>
          <h1 className="news-page-hero-title">
            Onze kijk op markten met groeipotentieel.
          </h1>
          <p className="news-page-hero-copy">
            Scherpe analyses vanuit first principles — over zorg, vastgoed,
            inrichting, technologie en de bredere PE- en VC-trends waarin wij
            kansen zien.
          </p>
        </div>
      </section>

      {articles.length === 0 ? (
        <div className="news-list">
          <p style={{ color: '#5b6680', fontSize: 16 }}>
            Nog geen nieuws — publiceer items via{' '}
            <Link href="/admin">/admin</Link>.
          </p>
        </div>
      ) : (
        <div className="news-list">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/nieuws/${article.slug}`}
              className="news-list-item"
            >
              <div className="news-list-meta">
                <span>{NEWS_CATEGORY_LABELS[article.category]}</span>
                <time dateTime={article.publishedDate}>
                  {formatDutchDate(article.publishedDate)}
                </time>
              </div>
              <div className="news-list-body">
                <h2 className="news-list-title">{article.title}</h2>
                <p className="news-list-excerpt">{article.excerpt}</p>
              </div>
              <span className="news-list-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
