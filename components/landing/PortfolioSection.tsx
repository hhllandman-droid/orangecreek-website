import OrangeCreekPortfolio from '@/components/landing/OrangeCreekPortfolio'
import { getPortfolioSectionData } from '@/lib/portfolio'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function PortfolioSection() {
  const { companies, edges, nodePositions, title, disclaimer } =
    await getPortfolioSectionData()

  return (
    <OrangeCreekPortfolio
      companies={companies}
      edges={edges}
      nodePositions={nodePositions}
      title={title}
      disclaimer={disclaimer}
    />
  )
}
