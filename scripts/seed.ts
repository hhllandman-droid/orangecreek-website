import 'dotenv/config'

import { SEED_COMPANIES, SEED_WEBSITE_SETTINGS } from './seed-data'

import { getPayloadClient } from '../lib/payload'

async function seed() {
  const payload = await getPayloadClient()

  const existing = await payload.find({
    collection: 'portfolio-companies',
    limit: 1,
    pagination: false,
  })

  if (existing.totalDocs > 0) {
    console.log(
      `Portfolio al gevuld (${existing.totalDocs} deelnemingen). Seed overgeslagen.`,
    )
    console.log('Gebruik --force om opnieuw te seeden (niet geïmplementeerd).')
    await seedWebsiteSettings(payload)
    process.exit(0)
  }

  console.log('Seeding portefeuillebedrijven…')

  const idBySlug = new Map<string, number>()

  for (const company of SEED_COMPANIES) {
    const created = await payload.create({
      collection: 'portfolio-companies',
      data: {
        companyName: company.companyName,
        slug: company.slug,
        domainLabel: company.domainLabel,
        sector: company.sector,
        investmentYear: company.investmentYear,
        revenueGrowth: company.revenueGrowth,
        ebitdaMargin: company.ebitdaMargin,
        multiple: company.multiple,
        status: 'actief',
        featured: true,
        order: company.order,
        chainPosition: company.chainPosition,
      },
      overrideAccess: true,
    })

    idBySlug.set(company.slug, created.id as number)
    console.log(`  ✓ ${company.companyName}`)
  }

  console.log('Koppelen waardeketen-verbindingen…')

  for (const company of SEED_COMPANIES) {
    const companyId = idBySlug.get(company.slug)
    if (!companyId) continue

    const connectedIds = company.connectsTo
      .map((slug) => idBySlug.get(slug))
      .filter((id): id is number => id !== undefined)

    await payload.update({
      collection: 'portfolio-companies',
      id: companyId,
      data: {
        connectedCompanies: connectedIds,
      },
      overrideAccess: true,
    })
  }

  await seedWebsiteSettings(payload)

  console.log('Seed voltooid.')
  process.exit(0)
}

async function seedWebsiteSettings(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
) {
  console.log('Bijwerken website-instellingen…')

  await payload.updateGlobal({
    slug: 'website-settings',
    data: SEED_WEBSITE_SETTINGS,
    overrideAccess: true,
  })

  console.log('  ✓ Website-instellingen')
}

seed().catch((error) => {
  console.error('Seed mislukt:', error)
  process.exit(1)
})
