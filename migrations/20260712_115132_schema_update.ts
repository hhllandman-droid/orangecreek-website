import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE 'energie' BEFORE 'overig';
  ALTER TYPE "public"."enum_portfolio_companies_sector" ADD VALUE 'logistiek' BEFORE 'overig';
  ALTER TABLE "news" DROP CONSTRAINT "news_author_id_users_id_fk";
  
  ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DEFAULT 'actief'::text;
  DROP TYPE "public"."enum_portfolio_companies_status";
  CREATE TYPE "public"."enum_portfolio_companies_status" AS ENUM('actief', 'exited');
  ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DEFAULT 'actief'::"public"."enum_portfolio_companies_status";
  ALTER TABLE "portfolio_companies" ALTER COLUMN "status" SET DATA TYPE "public"."enum_portfolio_companies_status" USING "status"::"public"."enum_portfolio_companies_status";
  DROP INDEX "news_author_idx";
  ALTER TABLE "website_settings" ADD COLUMN "hero_eyebrow" varchar DEFAULT 'Participatiemaatschappij · van ondernemers, voor ondernemers';
  ALTER TABLE "website_settings" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "website_settings" ADD COLUMN "hero_highlight" varchar;
  ALTER TABLE "website_settings" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "website_settings" ADD COLUMN "hero_cta_label" varchar DEFAULT 'Neem contact op';
  ALTER TABLE "website_settings" ADD COLUMN "hero_cta_url" varchar DEFAULT '#contact';
  ALTER TABLE "news" DROP COLUMN "author_id";
  ALTER TABLE "news" DROP COLUMN "seo_title";
  ALTER TABLE "news" DROP COLUMN "seo_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_portfolio_companies_status" ADD VALUE 'in-due-diligence';
  ALTER TABLE "portfolio_companies" ALTER COLUMN "sector" SET DATA TYPE text;
  DROP TYPE "public"."enum_portfolio_companies_sector";
  CREATE TYPE "public"."enum_portfolio_companies_sector" AS ENUM('zorg', 'vastgoed', 'tech', 'overig');
  ALTER TABLE "portfolio_companies" ALTER COLUMN "sector" SET DATA TYPE "public"."enum_portfolio_companies_sector" USING "sector"::"public"."enum_portfolio_companies_sector";
  ALTER TABLE "news" ADD COLUMN "author_id" integer;
  ALTER TABLE "news" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "news" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "news_author_idx" ON "news" USING btree ("author_id");
  ALTER TABLE "website_settings" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "website_settings" DROP COLUMN "hero_title";
  ALTER TABLE "website_settings" DROP COLUMN "hero_highlight";
  ALTER TABLE "website_settings" DROP COLUMN "hero_description";
  ALTER TABLE "website_settings" DROP COLUMN "hero_cta_label";
  ALTER TABLE "website_settings" DROP COLUMN "hero_cta_url";`)
}
