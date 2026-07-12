import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "portfolio_companies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_companies_id" integer
  );
  
  ALTER TABLE "portfolio_companies" ALTER COLUMN "featured" SET DEFAULT true;
  ALTER TABLE "portfolio_companies" ADD COLUMN "domain_label" varchar;
  ALTER TABLE "portfolio_companies" ADD COLUMN "revenue_growth" varchar;
  ALTER TABLE "portfolio_companies" ADD COLUMN "ebitda_margin" varchar;
  ALTER TABLE "portfolio_companies" ADD COLUMN "multiple" varchar;
  ALTER TABLE "portfolio_companies" ADD COLUMN "chain_position_x" numeric;
  ALTER TABLE "portfolio_companies" ADD COLUMN "chain_position_y" numeric;
  ALTER TABLE "website_settings" ADD COLUMN "portfolio_title" varchar DEFAULT '8 bedrijven, één waardeketen.';
  ALTER TABLE "website_settings" ADD COLUMN "portfolio_disclaimer" varchar DEFAULT 'Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen.';
  ALTER TABLE "portfolio_companies_rels" ADD CONSTRAINT "portfolio_companies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_companies_rels" ADD CONSTRAINT "portfolio_companies_rels_portfolio_companies_fk" FOREIGN KEY ("portfolio_companies_id") REFERENCES "public"."portfolio_companies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_companies_rels_order_idx" ON "portfolio_companies_rels" USING btree ("order");
  CREATE INDEX "portfolio_companies_rels_parent_idx" ON "portfolio_companies_rels" USING btree ("parent_id");
  CREATE INDEX "portfolio_companies_rels_path_idx" ON "portfolio_companies_rels" USING btree ("path");
  CREATE INDEX "portfolio_companies_rels_portfolio_companies_id_idx" ON "portfolio_companies_rels" USING btree ("portfolio_companies_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolio_companies_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "portfolio_companies_rels" CASCADE;
  ALTER TABLE "portfolio_companies" ALTER COLUMN "featured" SET DEFAULT false;
  ALTER TABLE "portfolio_companies" DROP COLUMN "domain_label";
  ALTER TABLE "portfolio_companies" DROP COLUMN "revenue_growth";
  ALTER TABLE "portfolio_companies" DROP COLUMN "ebitda_margin";
  ALTER TABLE "portfolio_companies" DROP COLUMN "multiple";
  ALTER TABLE "portfolio_companies" DROP COLUMN "chain_position_x";
  ALTER TABLE "portfolio_companies" DROP COLUMN "chain_position_y";
  ALTER TABLE "website_settings" DROP COLUMN "portfolio_title";
  ALTER TABLE "website_settings" DROP COLUMN "portfolio_disclaimer";`)
}
