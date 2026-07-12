import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Idempotent fix for production admin: portfolio-companies and website-settings
 * were returning 500 when expected columns/tables were missing.
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
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "portfolio_disclaimer" varchar DEFAULT 'Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen.';
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_portfolio_companies_sector') THEN
        ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE IF NOT EXISTS 'energie';
        ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE IF NOT EXISTS 'logistiek';
      END IF;
    END $$;
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

  await db.execute(sql`
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

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "portfolio_companies_rels_order_idx" ON "portfolio_companies_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "portfolio_companies_rels_parent_idx" ON "portfolio_companies_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_companies_rels_path_idx" ON "portfolio_companies_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "portfolio_companies_rels_portfolio_companies_id_idx" ON "portfolio_companies_rels" USING btree ("portfolio_companies_id");
  `)

  await db.execute(sql`
    INSERT INTO "website_settings" ("id", "company_name", "updated_at", "created_at")
    SELECT 1, 'Orange Creek Capital', now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "website_settings" LIMIT 1);
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
