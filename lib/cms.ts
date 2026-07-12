import type { News, PortfolioCompany, WebsiteSetting } from '@/payload-types'

import { getPayloadClient } from '@/lib/payload'

/** Gepubliceerde nieuwsitems, nieuwste eerst. */
export async function getPublishedNews(limit = 20): Promise<News[]> {
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
}

/** Actieve portefeuillebedrijven, gesorteerd op volgorde. */
export async function getActivePortfolioCompanies(
  limit = 50,
): Promise<PortfolioCompany[]> {
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
}

/** Uitgelichte portefeuillebedrijven voor homepage. */
export async function getFeaturedPortfolioCompanies(
  limit = 6,
): Promise<PortfolioCompany[]> {
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
}

/** Algemene website-instellingen (hero, contact, SEO). */
export async function getWebsiteSettings(): Promise<WebsiteSetting> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'website-settings',
    overrideAccess: false,
  })
}

/** Enkel nieuwsitem op slug (alleen published voor publiek). */
export async function getNewsBySlug(slug: string): Promise<News | null> {
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
}
