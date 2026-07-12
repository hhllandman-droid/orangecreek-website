import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar DEFAULT 'Participatiemaatschappij · van ondernemers, voor ondernemers';
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_title" varchar;
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_highlight" varchar;
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_cta_label" varchar DEFAULT 'Neem contact op';
    ALTER TABLE "website_settings" ADD COLUMN IF NOT EXISTS "hero_cta_url" varchar DEFAULT '#contact';
  `)

  await db.execute(sql`
    ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE IF NOT EXISTS 'energie' BEFORE 'overig';
    ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE IF NOT EXISTS 'logistiek' BEFORE 'overig';
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'enum_portfolio_companies_status'
          AND e.enumlabel = 'in-due-diligence'
      ) THEN
        UPDATE "portfolio_companies"
        SET "status" = 'actief'
        WHERE "status"::text = 'in-due-diligence';

        ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DATA TYPE text;
        ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DEFAULT 'actief'::text;
        DROP TYPE "public"."enum_portfolio_companies_status";
        CREATE TYPE "public"."enum_portfolio_companies_status" AS ENUM('actief', 'exited');
        ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DEFAULT 'actief'::"public"."enum_portfolio_companies_status";
        ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DATA TYPE "public"."enum_portfolio_companies_status" USING "status"::"public"."enum_portfolio_companies_status";
      END IF;
    END $$;
  `)

  await db.execute(sql`
    ALTER TABLE "news" DROP CONSTRAINT IF EXISTS "news_author_id_users_id_fk";
    DROP INDEX IF EXISTS "news_author_idx";
    ALTER TABLE "news" DROP COLUMN IF EXISTS "author_id";
    ALTER TABLE "news" DROP COLUMN IF EXISTS "seo_title";
    ALTER TABLE "news" DROP COLUMN IF EXISTS "seo_description";
  `)
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
