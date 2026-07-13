import type { News } from '@/payload-types'

import { getPublishedNews } from '@/lib/cms'
import {
  NEWS_ARTICLES,
  lexicalToBlocks,
  type NewsArticle,
  type NewsCategory,
} from '@/lib/news-articles'

function cmsToArticle(item: News): NewsArticle {
  return {
    slug: item.slug,
    title: item.title,
    metaDescription: item.excerpt ?? '',
    excerpt: item.excerpt ?? '',
    category: (item.category as NewsCategory) ?? 'markt',
    publishedDate: item.publishedDate ?? item.createdAt,
    body: lexicalToBlocks(item.content),
  }
}

/**
 * Genormaliseerde nieuwslijst voor de website.
 * Gebruikt gepubliceerde CMS-items indien aanwezig, anders de ingebouwde artikelen.
 */
export async function getNewsList(): Promise<NewsArticle[]> {
  const cms = await getPublishedNews(50)
  if (cms.length > 0) {
    return cms.map(cmsToArticle)
  }
  return NEWS_ARTICLES
}

/** Enkel nieuwsartikel op slug (CMS-first, met fallback). */
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const list = await getNewsList()
  const found = list.find((article) => article.slug === slug)
  if (found) return found
  return NEWS_ARTICLES.find((article) => article.slug === slug) ?? null
}
