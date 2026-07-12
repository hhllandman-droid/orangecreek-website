import type { PortfolioCompany } from '@/payload-types'

import type { PortfolioCompanyItem } from '@/components/landing/OrangeCreekPortfolio'
import { FALLBACK_WEBSITE_SETTINGS } from '@/lib/cms-fallbacks'
import { getActivePortfolioCompanies, getWebsiteSettings } from '@/lib/cms'

const FALLBACK_NODE_POS = [
  { x: 22, y: 18 },
  { x: 56, y: 12 },
  { x: 79, y: 32 },
  { x: 42, y: 42 },
  { x: 18, y: 62 },
  { x: 66, y: 60 },
  { x: 36, y: 84 },
  { x: 78, y: 84 },
]

export type PortfolioSectionData = {
  companies: PortfolioCompanyItem[]
  edges: [number, number][]
  nodePositions: { x: number; y: number }[]
  title: string
  disclaimer: string
}

export function toPortfolioCompanyItem(
  company: PortfolioCompany,
): PortfolioCompanyItem {
  return {
    name: company.companyName,
    domain: company.domainLabel ?? '',
    since: company.investmentYear ? String(company.investmentYear) : '',
    groei: company.revenueGrowth ?? '—',
    marge: company.ebitdaMargin ?? '—',
    multiple: company.multiple ?? '—',
  }
}

/** Bouwt unieke grafiek-edges uit `connectedCompanies` relaties. */
export function buildPortfolioEdges(
  companies: PortfolioCompany[],
): [number, number][] {
  const idToIndex = new Map(
    companies.map((company, index) => [company.id, index]),
  )
  const seen = new Set<string>()
  const edges: [number, number][] = []

  for (const company of companies) {
    const fromIndex = idToIndex.get(company.id)
    if (fromIndex === undefined) continue

    const connections = company.connectedCompanies ?? []
    for (const connection of connections) {
      const connectionId =
        typeof connection === 'object' ? connection.id : connection
      const toIndex = idToIndex.get(connectionId)
      if (toIndex === undefined || toIndex === fromIndex) continue

      const a = Math.min(fromIndex, toIndex)
      const b = Math.max(fromIndex, toIndex)
      const key = `${a}-${b}`

      if (!seen.has(key)) {
        seen.add(key)
        edges.push([a, b])
      }
    }
  }

  return edges
}

export function buildNodePositions(
  companies: PortfolioCompany[],
): { x: number; y: number }[] {
  return companies.map((company, index) => {
    if (
      company.chainPosition?.x !== null &&
      company.chainPosition?.x !== undefined &&
      company.chainPosition?.y !== null &&
      company.chainPosition?.y !== undefined
    ) {
      return {
        x: company.chainPosition.x,
        y: company.chainPosition.y,
      }
    }

    return FALLBACK_NODE_POS[index % FALLBACK_NODE_POS.length]
  })
}

export async function getPortfolioSectionData(): Promise<PortfolioSectionData> {
  const fallback: PortfolioSectionData = {
    companies: [],
    edges: [],
    nodePositions: [],
    title: FALLBACK_WEBSITE_SETTINGS.portfolioTitle ?? '8 bedrijven, één waardeketen.',
    disclaimer: FALLBACK_WEBSITE_SETTINGS.portfolioDisclaimer ?? '',
  }

  try {
    const [companies, settings] = await Promise.all([
      getActivePortfolioCompanies(50),
      getWebsiteSettings(),
    ])

    if (companies.length === 0) {
      return {
        companies: [],
        edges: [],
        nodePositions: [],
        title: settings.portfolioTitle ?? fallback.title,
        disclaimer: settings.portfolioDisclaimer ?? fallback.disclaimer,
      }
    }

    return {
      companies: companies.map(toPortfolioCompanyItem),
      edges: buildPortfolioEdges(companies),
      nodePositions: buildNodePositions(companies),
      title:
        settings.portfolioTitle ??
        `${companies.length} bedrijven, één waardeketen.`,
      disclaimer: settings.portfolioDisclaimer ?? '',
    }
  } catch (error) {
    console.error('[portfolio] getPortfolioSectionData failed', error)
    return fallback
  }
}
