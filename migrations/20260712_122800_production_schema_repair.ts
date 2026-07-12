import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Idempotent repair migration: safe to re-run if earlier migrations failed partway.
 * Adds CMS columns the frontend expects without touching risky enum rewrites.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar DEFAULT 'Participatiemaatschappij · van ondernemers, voor ondernemers';
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_title" varchar;
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_highlight" varchar;
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_cta_label" varchar DEFAULT 'Neem contact op';
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_cta_url" varchar DEFAULT '#contact';
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "portfolio_title" varchar DEFAULT '8 bedrijven, één waardeketen.';
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "portfolio_disclaimer" varchar DEFAULT 'Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen';
  `)

  await db.execute(sql`
    ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "domain_label" varchar;
    ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "revenue_growth" varchar;
    ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "ebitda_margin" varchar;
    ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "multiple" varchar;
    ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "chain_position_x" numeric;
    ALTER TABLE "portfolio_companies" ADD COLUMN IF NOT EXISTS "chain_position_y" numeric;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "portfolio_companies_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "portfolio_companies_id" integer
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_eyebrow";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_title";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_highlight";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_description";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_cta_label";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_cta_url";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "portfolio_title";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "portfolio_disclaimer";
    ALTER TABLE "portfolio_companies" DROP COLUMN IF EXISTS "domain_label";
    ALTER TABLE "portfolio_companies" DROP COLUMN IF EXISTS "revenue_growth";
    ALTER TABLE "portfolio_companies" DROP COLUMN IF EXISTS "ebitda_margin";
    ALTER TABLE "portfolio_companies" DROP COLUMN IF EXISTS "multiple";
    ALTER TABLE "portfolio_companies" DROP COLUMN IF EXISTS "chain_position_x";
    ALTER TABLE "portfolio_companies" DROP COLUMN IF EXISTS "chain_position_y";
    DROP TABLE IF EXISTS "portfolio_companies_rels" CASCADE;
  `)
}
