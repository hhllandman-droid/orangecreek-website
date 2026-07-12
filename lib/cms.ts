import type { News, PortfolioCompany, WebsiteSetting } from '@/payload-types'

import { FALLBACK_WEBSITE_SETTINGS } from '@/lib/cms-fallbacks'
import { getPayloadClient } from '@/lib/payload'

function logCmsError(context: string, error: unknown) {
  console.error(`[cms] ${context}`, error)
}

/** Gepubliceerde nieuwsitems, nieuwste eerst. */
export async function getPublishedNews(limit = 20): Promise<News[]> {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'news',
      sort: '-publishedDate',
      where: {
        status: { equals: 'published' },
      },
      limit,
      overrideAccess: false,
    })

    return docs
  } catch (error) {
    logCmsError('getPublishedNews failed', error)
    return []
  }
}

/** Actieve portefeuillebedrijven, gesorteerd op volgorde. */
export async function getActivePortfolioCompanies(
  limit = 50,
): Promise<PortfolioCompany[]> {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'portfolio-companies',
      sort: 'order',
      depth: 1,
      where: {
        status: { equals: 'actief' },
      },
      limit,
      overrideAccess: false,
    })

    return docs
  } catch (error) {
    logCmsError('getActivePortfolioCompanies failed', error)
    return []
  }
}

/** Uitgelichte portefeuillebedrijven voor homepage. */
export async function getFeaturedPortfolioCompanies(
  limit = 6,
): Promise<PortfolioCompany[]> {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'portfolio-companies',
      sort: 'order',
      where: {
        and: [
          { status: { equals: 'actief' } },
          { featured: { equals: true } },
        ],
      },
      limit,
      overrideAccess: false,
    })

    return docs
  } catch (error) {
    logCmsError('getFeaturedPortfolioCompanies failed', error)
    return []
  }
}

/** Algemene website-instellingen (hero, contact, SEO). */
export async function getWebsiteSettings(): Promise<WebsiteSetting> {
  try {
    const payload = await getPayloadClient()

    return payload.findGlobal({
      slug: 'website-settings',
      overrideAccess: false,
    })
  } catch (error) {
    logCmsError('getWebsiteSettings failed', error)
    return FALLBACK_WEBSITE_SETTINGS
  }
}

/** Enkel nieuwsitem op slug (alleen published voor publiek). */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'news',
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      overrideAccess: false,
    })

    return docs[0] ?? null
  } catch (error) {
    logCmsError(`getNewsBySlug(${slug}) failed`, error)
    return null
  }
}
