import { NextResponse } from 'next/server'
import pg from 'pg'

export const dynamic = 'force-dynamic'

const REQUIRED_PORTFOLIO_COLUMNS = [
  'company_name',
  'slug',
  'domain_label',
  'revenue_growth',
  'ebitda_margin',
  'multiple',
  'chain_position_x',
  'chain_position_y',
]

const REQUIRED_WEBSITE_COLUMNS = [
  'hero_eyebrow',
  'portfolio_title',
  'portfolio_disclaimer',
]

export async function GET() {
  const connectionString = process.env.DATABASE_URI
  if (!connectionString) {
    return NextResponse.json({ error: 'DATABASE_URI not set' }, { status: 500 })
  }

  const pool = new pg.Pool({ connectionString })

  try {
    const tables = await pool.query<{ table_name: string }>(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('portfolio_companies', 'website_settings', 'media', 'portfolio_companies_rels')
      ORDER BY table_name
    `)

    const portfolioColumns = await pool.query<{ column_name: string }>(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portfolio_companies'
      ORDER BY column_name
    `)

    const websiteColumns = await pool.query<{ column_name: string }>(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'website_settings'
      ORDER BY column_name
    `)

    const portfolioCount = await pool.query<{ count: string }>(
      'SELECT COUNT(*)::text AS count FROM portfolio_companies',
    )

    const migrations = await pool.query<{ name: string }>(`
      SELECT name FROM payload_migrations ORDER BY id
    `)

    const existingPortfolio = new Set(
      portfolioColumns.rows.map((row) => row.column_name),
    )
    const existingWebsite = new Set(websiteColumns.rows.map((row) => row.column_name))

    let payloadError: string | null = null
    try {
      const { getPayloadClient } = await import('@/lib/payload')
      const payload = await getPayloadClient()
      await payload.find({
        collection: 'portfolio-companies',
        limit: 1,
        overrideAccess: true,
      })
    } catch (error) {
      payloadError =
        error instanceof Error ? error.message : String(error)
    }

    return NextResponse.json({
      tables: tables.rows.map((row) => row.table_name),
      portfolioCompanies: Number(portfolioCount.rows[0]?.count ?? 0),
      missingPortfolioColumns: REQUIRED_PORTFOLIO_COLUMNS.filter(
        (column) => !existingPortfolio.has(column),
      ),
      missingWebsiteColumns: REQUIRED_WEBSITE_COLUMNS.filter(
        (column) => !existingWebsite.has(column),
      ),
      migrations: migrations.rows.map((row) => row.name),
      payloadError,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  } finally {
    await pool.end()
  }
}
