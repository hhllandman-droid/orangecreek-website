import {
  getActivePortfolioCompanies,
  getWebsiteSettings,
} from '@/lib/cms'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Voorbeeld Server Component: portefeuillebedrijven ophalen via Payload Local API.
 *
 * ```tsx
 * import { getActivePortfolioCompanies } from '@/lib/cms'
 *
 * const companies = await getActivePortfolioCompanies()
 * ```
 */
export default async function PortfolioPage() {
  const [companies, settings] = await Promise.all([
    getActivePortfolioCompanies(),
    getWebsiteSettings(),
  ])

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>{settings.companyName ?? 'Portefeuille'}</h1>
      <p style={{ color: '#666' }}>
        Data uit Payload CMS — collectie <code>portfolio-companies</code>
      </p>
      <ul>
        {companies.map((company) => (
          <li key={company.id} style={{ marginBottom: '1rem' }}>
            <strong>{company.companyName}</strong>
        {company.domainLabel && ` · ${company.domainLabel}`}
            {company.revenueGrowth && ` · groei ${company.revenueGrowth}`}
            {company.website && (
              <>
                {' '}
                ·{' '}
                <a href={company.website} target="_blank" rel="noreferrer">
                  Website
                </a>
              </>
            )}
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
          Nog geen bedrijven — voeg ze toe via <a href="/admin">/admin</a>.
        </p>
      )}
    </main>
  )
}
