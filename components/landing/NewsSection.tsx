import Link from 'next/link'

import { formatDutchDate } from '@/lib/format'
import { getNewsList } from '@/lib/news'
import { NEWS_CATEGORY_LABELS } from '@/lib/news-articles'

export default async function NewsSection() {
  const articles = await getNewsList()
  if (articles.length === 0) return null

  const featured = articles.slice(0, 3)

  return (
    <section id="nieuws" className="landing-news">
      <div className="landing-section-inner landing-section-padded">
        <div className="landing-news-head">
          <div className="landing-news-head-text">
            <span className="landing-label">Nieuws &amp; inzichten</span>
            <h2 className="landing-heading">
              Onze kijk op markten met groeipotentieel.
            </h2>
            <p className="landing-body">
              Scherpe analyses vanuit first principles — over zorg, vastgoed,
              inrichting, technologie en de bredere PE- en VC-trends waarin wij
              kansen zien.
            </p>
          </div>
          <Link className="landing-news-all" href="/nieuws">
            Al het nieuws
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="landing-news-grid">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/nieuws/${article.slug}`}
              className="landing-news-card"
            >
              <div className="landing-news-card-meta">
                <span className="landing-news-tag">
                  {NEWS_CATEGORY_LABELS[article.category]}
                </span>
                <time dateTime={article.publishedDate}>
                  {formatDutchDate(article.publishedDate)}
                </time>
              </div>
              <h3 className="landing-news-card-title">{article.title}</h3>
              <p className="landing-news-card-excerpt">{article.excerpt}</p>
              <span className="landing-news-card-link">Lees verder →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
