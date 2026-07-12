import OrangeCreekPortfolio from '@/components/landing/OrangeCreekPortfolio'
import { getPortfolioSectionData } from '@/lib/portfolio'

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
