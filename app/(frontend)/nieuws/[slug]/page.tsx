import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArticleBody } from '@/components/news/ArticleBody'
import { SiteFooter } from '@/components/landing/SiteFooter'
import { SiteHeader } from '@/components/landing/SiteHeader'
import { formatDutchDate } from '@/lib/format'
import { getNewsArticle } from '@/lib/news'
import {
  NEWS_CATEGORY_LABELS,
  estimateReadingMinutes,
} from '@/lib/news-articles'
import '@/styles/landing.css'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    return { title: 'Nieuws niet gevonden — Orange Creek Capital' }
  }

  return {
    title: `${article.title} — Orange Creek Capital`,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
    },
  }
}

export default async function NieuwsArtikelPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  const readingMinutes = estimateReadingMinutes(article.body)

  return (
    <div className="news-article">
      <SiteHeader />

      <article className="news-article-inner">
        <Link href="/nieuws" className="news-article-back">
          <span aria-hidden>←</span> Al het nieuws
        </Link>

        <div className="news-article-meta">
          <span>{NEWS_CATEGORY_LABELS[article.category]}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedDate}>
            {formatDutchDate(article.publishedDate)}
          </time>
          <span aria-hidden>·</span>
          <span>{readingMinutes} min lezen</span>
        </div>

        <h1 className="news-article-title">{article.title}</h1>
        <p className="news-article-lead">{article.excerpt}</p>

        <div className="news-article-body">
          <ArticleBody body={article.body} />
        </div>

        <div className="news-article-footer">
          <p className="news-article-footer-text">
            Orange Creek investeert vanuit first principles in bedrijven met
            exponentieel groeipotentieel binnen hun waardeketen. Ondernemer,
            mede-investeerder of partner?
          </p>
          <Link className="landing-btn-primary" href="/#contact">
            Neem contact op
          </Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  )
}
