import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // No-op: schema changes moved to later idempotent migrations and ensure-schema.ts.
  // This migration previously blocked deploys when enum ALTER failed in a transaction.
  await db.execute(sql`SELECT 1`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_portfolio_companies_status" ADD VALUE IF NOT EXISTS 'in-due-diligence';
    ALTER TABLE "portfolio_companies" ALTER COLUMN "sector" SET DATA TYPE text;
    DROP TYPE "public"."enum_portfolio_companies_sector";
    CREATE TYPE "public"."enum_portfolio_companies_sector" AS ENUM('zorg', 'vastgoed', 'tech', 'overig');
    ALTER TABLE "portfolio_companies" ALTER COLUMN "sector" SET DATA TYPE "public"."enum_portfolio_companies_sector" USING "sector"::"public"."enum_portfolio_companies_sector";
    ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "author_id" integer;
    ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "seo_title" varchar;
    ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "seo_description" varchar;
    ALTER TABLE "news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "news_author_idx" ON "news" USING btree ("author_id");
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_eyebrow";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_title";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_highlight";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_description";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_cta_label";
    ALTER TABLE "website_settings" DROP COLUMN IF EXISTS "hero_cta_url";
  `)
}
