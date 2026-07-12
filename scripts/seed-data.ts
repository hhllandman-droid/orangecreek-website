/**
 * Seed-data voor portefeuillebedrijven en website-instellingen.
 * Komt overeen met de placeholders op de homepage (Deelneming A–H).
 */

export type SeedCompany = {
  companyName: string
  slug: string
  domainLabel: string
  sector: 'tech' | 'logistiek' | 'energie' | 'overig' | 'zorg'
  investmentYear: number
  revenueGrowth: string
  ebitdaMargin: string
  multiple: string
  order: number
  chainPosition: { x: number; y: number }
  /** Slugs van verbonden deelnemingen in de waardeketen */
  connectsTo: string[]
}

export const SEED_COMPANIES: SeedCompany[] = [
  {
    companyName: 'Deelneming A',
    slug: 'deelneming-a',
    domainLabel: 'SaaS · workflow',
    sector: 'tech',
    investmentYear: 2019,
    revenueGrowth: '+38%',
    ebitdaMargin: '24%',
    multiple: '2,8×',
    order: 0,
    chainPosition: { x: 22, y: 18 },
    connectsTo: ['deelneming-b', 'deelneming-d'],
  },
  {
    companyName: 'Deelneming B',
    slug: 'deelneming-b',
    domainLabel: 'Logistiek · platform',
    sector: 'logistiek',
    investmentYear: 2020,
    revenueGrowth: '+22%',
    ebitdaMargin: '18%',
    multiple: '2,1×',
    order: 1,
    chainPosition: { x: 56, y: 12 },
    connectsTo: ['deelneming-a', 'deelneming-c', 'deelneming-d'],
  },
  {
    companyName: 'Deelneming C',
    slug: 'deelneming-c',
    domainLabel: 'Energie · data',
    sector: 'energie',
    investmentYear: 2021,
    revenueGrowth: '+51%',
    ebitdaMargin: '12%',
    multiple: '1,9×',
    order: 2,
    chainPosition: { x: 79, y: 32 },
    connectsTo: ['deelneming-b', 'deelneming-f'],
  },
  {
    companyName: 'Deelneming D',
    slug: 'deelneming-d',
    domainLabel: 'Fintech · B2B',
    sector: 'tech',
    investmentYear: 2018,
    revenueGrowth: '+17%',
    ebitdaMargin: '31%',
    multiple: '3,4×',
    order: 3,
    chainPosition: { x: 42, y: 42 },
    connectsTo: ['deelneming-a', 'deelneming-b', 'deelneming-e', 'deelneming-f'],
  },
  {
    companyName: 'Deelneming E',
    slug: 'deelneming-e',
    domainLabel: 'Circulair · productie',
    sector: 'overig',
    investmentYear: 2022,
    revenueGrowth: '+29%',
    ebitdaMargin: '15%',
    multiple: '1,6×',
    order: 4,
    chainPosition: { x: 18, y: 62 },
    connectsTo: ['deelneming-d', 'deelneming-g'],
  },
  {
    companyName: 'Deelneming F',
    slug: 'deelneming-f',
    domainLabel: 'Health · software',
    sector: 'zorg',
    investmentYear: 2023,
    revenueGrowth: '+44%',
    ebitdaMargin: '9%',
    multiple: '1,3×',
    order: 5,
    chainPosition: { x: 66, y: 60 },
    connectsTo: ['deelneming-c', 'deelneming-d', 'deelneming-g', 'deelneming-h'],
  },
  {
    companyName: 'Deelneming G',
    slug: 'deelneming-g',
    domainLabel: 'Agri · sensoren',
    sector: 'overig',
    investmentYear: 2020,
    revenueGrowth: '+19%',
    ebitdaMargin: '21%',
    multiple: '2,2×',
    order: 6,
    chainPosition: { x: 36, y: 84 },
    connectsTo: ['deelneming-e', 'deelneming-f', 'deelneming-h'],
  },
  {
    companyName: 'Deelneming H',
    slug: 'deelneming-h',
    domainLabel: 'Retail · data',
    sector: 'tech',
    investmentYear: 2021,
    revenueGrowth: '+26%',
    ebitdaMargin: '16%',
    multiple: '1,8×',
    order: 7,
    chainPosition: { x: 78, y: 84 },
    connectsTo: ['deelneming-f', 'deelneming-g'],
  },
]

export const SEED_WEBSITE_SETTINGS = {
  companyName: 'Orange Creek Capital',
  heroEyebrow: 'Participatiemaatschappij · van ondernemers, voor ondernemers',
  heroTitle: 'When life gives oranges,',
  heroHighlight: 'we make lemonade.',
  heroDescription:
    'We strippen complexiteit tot de kern en bouwen vandaaruit bedrijven met exponentieel groeipotentieel. Geen afstandelijke beheerders — ondernemers met visie en skin in the game.',
  heroCtaLabel: 'Neem contact op',
  heroCtaUrl: '#contact',
  contactEmail: 'info@orangecreek.co',
  portfolioTitle: '8 bedrijven, één waardeketen.',
  portfolioDisclaimer:
    'Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen.',
  seoTitle: 'Orange Creek Capital',
  seoDescription:
    'Participatiemaatschappij van ondernemers, voor ondernemers. We bouwen bedrijven met exponentieel groeipotentieel.',
}
