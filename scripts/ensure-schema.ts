/**
 * Direct schema repair — runs on every startup, independent of payload_migrations.
 * Fixes missing portfolio/website-settings columns when tracked migrations failed partway.
 */
import 'dotenv/config'

import pg from 'pg'

const { Pool } = pg

const statements = [
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar DEFAULT 'Participatiemaatschappij · van ondernemers, voor ondernemers'`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_title" varchar`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_highlight" varchar`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_description" varchar`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_cta_label" varchar DEFAULT 'Neem contact op'`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_cta_url" varchar DEFAULT '#contact'`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "portfolio_title" varchar DEFAULT '8 bedrijven, één waardeketen.'`,
  `ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "portfolio_disclaimer" varchar DEFAULT 'Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen.'`,
  `ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "domain_label" varchar`,
  `ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "revenue_growth" varchar`,
  `ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "ebitda_margin" varchar`,
  `ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "multiple" varchar`,
  `ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "chain_position_x" numeric`,
  `ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "chain_position_y" numeric`,
  `CREATE TABLE IF NOT EXISTS "portfolio_companies_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "portfolio_companies_id" integer
  )`,
  `INSERT INTO "website_settings" ("id", "company_name", "updated_at", "created_at")
   SELECT 1, 'Orange Creek Capital', now(), now()
   WHERE NOT EXISTS (SELECT 1 FROM "website_settings" LIMIT 1)`,
]

async function ensureSchema() {
  const connectionString = process.env.DATABASE_URI
  if (!connectionString) {
    console.log('ensure-schema: DATABASE_URI not set, skipping.')
    return
  }

  const pool = new Pool({ connectionString })
  const client = await pool.connect()

  try {
    const tableCheck = await client.query<{ exists: boolean }>(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'portfolio_companies'
      ) AS exists
    `)

    if (!tableCheck.rows[0]?.exists) {
      console.error(
        'ensure-schema: portfolio_companies table missing — initial migration never ran.',
      )
      process.exit(1)
    }

    // Enum changes cannot run inside a transaction on some Postgres setups.
    await client.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_portfolio_companies_sector') THEN
          ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE IF NOT EXISTS 'energie';
          ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE IF NOT EXISTS 'logistiek';
        END IF;
      END $$;
    `)

    await client.query('BEGIN')

    for (const statement of statements) {
      await client.query(statement)
    }

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'portfolio_companies_rels_parent_fk'
        ) THEN
          ALTER TABLE "portfolio_companies_rels" ADD CONSTRAINT "portfolio_companies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_companies"("id") ON DELETE cascade ON UPDATE no action;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'portfolio_companies_rels_portfolio_companies_fk'
        ) THEN
          ALTER TABLE "portfolio_companies_rels" ADD CONSTRAINT "portfolio_companies_rels_portfolio_companies_fk" FOREIGN KEY ("portfolio_companies_id") REFERENCES "public"."portfolio_companies"("id") ON DELETE cascade ON UPDATE no action;
        END IF;
      END $$;
    `)

    await client.query('COMMIT')
    console.log('ensure-schema: schema OK')
  } catch (error) {
    try {
      await client.query('ROLLBACK')
    } catch {
      // ignore rollback errors
    }
    console.error('ensure-schema: failed', error)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

ensureSchema()
