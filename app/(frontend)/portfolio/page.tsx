import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

/**
 * Voorbeeld: portefeuillebedrijven ophalen in een Server Component.
 * Gebruikt de Payload Local API — geen HTTP-overhead.
 */
export default async function PortfolioPage() {
  const payload = await getPayloadClient()

  const { docs: companies } = await payload.find({
    collection: 'portfolio-companies',
    sort: 'order',
    where: {
      status: {
        equals: 'actief',
      },
    },
    limit: 50,
  })

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Portefeuille</h1>
      <p>
        Voorbeeldpagina — data uit Payload CMS via de Local API in een Server
        Component.
      </p>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <strong>{company.companyName}</strong>
            {company.sector && ` · ${company.sector}`}
            {company.shortDescription && (
              <p style={{ margin: '0.25rem 0', color: '#555' }}>
                {company.shortDescription}
              </p>
            )}
          </li>
        ))}
      </ul>
      {companies.length === 0 && (
        <p>
          Nog geen bedrijven — voeg ze toe via{' '}
          <a href="/admin">/admin</a>.
        </p>
      )}
    </main>
  )
}
