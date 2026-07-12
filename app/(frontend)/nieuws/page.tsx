import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Voorbeeld: gepubliceerd nieuws ophalen in een Server Component.
 * Access control wordt gerespecteerd (overrideAccess: false).
 */
export default async function NieuwsPage() {
  const payload = await getPayloadClient()

  const { docs: articles } = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 20,
    overrideAccess: false,
  })

  const settings = await payload.findGlobal({
    slug: 'website-settings',
    overrideAccess: false,
  })

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Nieuws</h1>
      {settings.companyName && (
        <p style={{ color: '#666' }}>{settings.companyName}</p>
      )}
      <ul>
        {articles.map((article) => (
          <li key={article.id} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>{article.title}</h2>
            {article.publishedDate && (
              <time style={{ color: '#888', fontSize: '0.875rem' }}>
                {new Date(article.publishedDate).toLocaleDateString('nl-NL')}
              </time>
            )}
            {article.excerpt && <p>{article.excerpt}</p>}
          </li>
        ))}
      </ul>
      {articles.length === 0 && (
        <p>
          Nog geen nieuws — publiceer items via{' '}
          <a href="/admin">/admin</a>.
        </p>
      )}
    </main>
  )
}
