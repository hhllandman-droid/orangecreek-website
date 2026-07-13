import type { News } from '@/payload-types'

/** Categorieën zoals gedefinieerd in de News-collectie. */
export type NewsCategory = NonNullable<News['category']>

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  bedrijfsnieuws: 'Bedrijfsnieuws',
  portfolio: 'Portfolio',
  markt: 'Markt',
  overig: 'Overig',
}

/** Eenvoudig contentblok voor weergave (en bron voor de CMS rich text). */
export type NewsBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'li'; text: string }

/** Genormaliseerd nieuwsartikel voor de website (CMS of fallback). */
export type NewsArticle = {
  slug: string
  title: string
  metaDescription: string
  excerpt: string
  category: NewsCategory
  publishedDate: string
  body: NewsBlock[]
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'vergrijzing-zorg-en-woonvastgoed',
    title:
      'Vergrijzing: van uitdaging naar de grootste zorg- en vastgoedkans van dit decennium',
    metaDescription:
      'De dubbele vergrijzing verandert zorg én woonvastgoed fundamenteel. Waar liggen de kansen voor ondernemers en investeerders?',
    excerpt:
      'Tegen 2040 telt Nederland ruim vier miljoen 65-plussers. Dat is geen abstract demografisch feit, maar een decennium aan concrete kansen in zorg en woonvastgoed.',
    category: 'markt',
    publishedDate: '2026-07-08',
    body: [
      {
        type: 'p',
        text: 'Nederland vergrijst in twee richtingen tegelijk: er komen meer ouderen bij én de gemiddelde leeftijd binnen die groep stijgt. Tegen 2040 telt ons land ruim vier miljoen 65-plussers. Dat is geen abstract demografisch feit, maar een concrete verschuiving in de vraag naar zorg, wonen en alles daartussenin. Wie de onderliggende drijfveren begrijpt, ziet geen probleem maar een decennium aan kansen.',
      },
      {
        type: 'li',
        text: 'De zorgvraag groeit sneller dan het personeel. De rek is uit het systeem: groei moet komen uit slimmere processen, technologie en nieuwe woon-zorgconcepten in plaats van simpelweg méér handen.',
      },
      {
        type: 'li',
        text: 'Wonen en zorg smelten samen. De harde grens tussen thuis en instelling vervaagt. Geclusterde, levensloopbestendige woonvormen combineren zelfstandigheid met zorg op afroep — precies waar vraag en betaalbaarheid elkaar raken.',
      },
      {
        type: 'li',
        text: 'Vastgoed wordt een zorgproduct. Locatie, indeling en techniek bepalen straks of een gebouw geschikt is voor de oudere van morgen. Herbestemming en nieuwbouw met zorg-DNA winnen aan waarde.',
      },
      {
        type: 'li',
        text: 'Kapitaal zoekt schaalbare modellen. Versnipperd aanbod en lokale initiatieven vragen om professionalisering, standaardisatie en langetermijnkapitaal om echt impact te maken.',
      },
      {
        type: 'p',
        text: 'De vergrijzing dwingt ons terug naar de kern: wat heeft een mens nodig om waardig en zelfstandig ouder te worden? Vanuit die vraag bouwen wij aan bedrijven die zorg en woonvastgoed slimmer verbinden — met geduldig kapitaal en een blik op exponentiële, blijvende waarde. Niet omdat het moet, maar omdat hier de grootste maatschappelijke én economische winst ligt.',
      },
    ],
  },
  {
    slug: 'kansen-meubel-en-projectinrichting',
    title:
      'Inrichting als groeimotor: de stille kans in de meubel- en projectinrichtingsmarkt',
    metaDescription:
      'Nieuwe woon- en zorglocaties vragen om slimme, duurzame inrichting. Waarom projectinrichting rijp is voor schaalbare groei.',
    excerpt:
      'Achter elke nieuwe woontoren en zorglocatie schuilt een minder zichtbare markt: die van meubilair en projectinrichting. Vaak een sluitpost — onterecht.',
    category: 'markt',
    publishedDate: '2026-06-24',
    body: [
      {
        type: 'p',
        text: 'Achter elke nieuwe woontoren, zorglocatie of gerenoveerde verpleegafdeling schuilt een minder zichtbare markt: die van meubilair en projectinrichting. Terwijl de bouwopgave alle aandacht krijgt, wordt de inrichting vaak als sluitpost gezien. Onterecht — juist hier ligt een schaalbare, veerkrachtige markt met structurele rugwind.',
      },
      {
        type: 'li',
        text: 'De demografie stuwt het volume. Meer zorglocaties, geclusterde woonvormen en gerenoveerd bestaand vastgoed betekenen een gestage, langjarige vraag naar functionele, duurzame inrichting.',
      },
      {
        type: 'li',
        text: 'Inrichting is geen kostenpost, maar een prestatiefactor. Slim ingerichte ruimtes verlagen valincidenten, ondersteunen zorgpersoneel en verhogen het welzijn van bewoners. Kwaliteit betaalt zich terug.',
      },
      {
        type: 'li',
        text: 'Duurzaamheid en circulariteit worden de norm. Opdrachtgevers eisen herbruikbaar, onderhoudsarm en aantoonbaar circulair meubilair. Partijen die dit standaard leveren, bouwen een structureel concurrentievoordeel.',
      },
      {
        type: 'li',
        text: 'De markt is versnipperd en professionaliseert. Veel kleine, ambachtelijke spelers naast een groeiende vraag naar ontzorging: van ontwerp en levering tot montage en beheer. Een klassieke voedingsbodem voor consolidatie en schaal.',
      },
      {
        type: 'p',
        text: 'First principles: een gebouw is pas af als mensen er goed kunnen leven en werken. Vanuit dat inzicht zien wij de inrichtingsmarkt niet als niche, maar als onmisbare schakel in de waardeketen rond wonen en zorg. Bedrijven die ontwerp, duurzaamheid en operationele slagkracht combineren, hebben precies het profiel waarin wij graag langjarig investeren.',
      },
    ],
  },
  {
    slug: 'ai-en-technologie-bij-personeelstekorten',
    title: 'Personeelstekort als aanjager: hoe AI schaarste omzet in schaalvoordeel',
    metaDescription:
      'Structurele krapte dwingt sectoren tot technologie. Waar AI het verschil maakt tussen stilstand en exponentiële groei.',
    excerpt:
      'Personeelstekorten zijn geen tijdelijke hobbel meer, maar een structureel kenmerk van de arbeidsmarkt. De reflex om meer mensen te zoeken werkt niet langer.',
    category: 'markt',
    publishedDate: '2026-06-10',
    body: [
      {
        type: 'p',
        text: 'Van de techniek tot de zorg en van logistiek tot horeca: personeelstekorten zijn geen tijdelijke hobbel meer, maar een structureel kenmerk van de Nederlandse arbeidsmarkt. De vijver droogt op door vergrijzing en een krimpende beroepsbevolking. De reflex om meer mensen te zoeken werkt niet langer. De echte vraag is: hoe krijgen we hetzelfde — of meer — gedaan met dezelfde mensen?',
      },
      {
        type: 'li',
        text: 'AI verschuift van experiment naar noodzaak. Waar automatisering vroeger een kostenoptie was, is het nu vaak de enige manier om vraag te blijven bedienen. Dat verandert de adoptiecurve fundamenteel.',
      },
      {
        type: 'li',
        text: 'De grootste winst zit in het alledaagse. Niet de spectaculaire toepassingen, maar het wegnemen van repetitief werk — plannen, administreren, controleren — geeft schaars talent tijd terug voor waar mensen onmisbaar zijn.',
      },
      {
        type: 'li',
        text: 'Technologie vergroot menselijke capaciteit. De winnaars zetten AI niet in om mensen te vervangen, maar om hen productiever, veiliger en tevredener te maken. Zo wordt schaarste een hefboom in plaats van een rem.',
      },
      {
        type: 'li',
        text: 'Data is het nieuwe fundament. Bedrijven die hun processen digitaliseren, bouwen de basis waarop AI pas echt rendeert. Wie nu investeert, bouwt een voorsprong die moeilijk in te halen is.',
      },
      {
        type: 'p',
        text: 'Teruggebracht tot de kern: schaarste dwingt tot slimmer werken, en slimmer werken schaalt. Wij zoeken bedrijven die technologie inzetten om fundamentele knelpunten op te lossen in sectoren met blijvende krapte. Daar ontstaat exponentieel groeipotentieel — precies het soort waarde dat wij met geduldig kapitaal helpen ontketenen.',
      },
    ],
  },
  {
    slug: 'buy-and-build-in-een-consolidatiemarkt',
    title:
      'Buy-and-build: waarom versnippering de grootste kans is in een consolidatiemarkt',
    metaDescription:
      'In gefragmenteerde markten wint wie slim consolideert. Het PE-perspectief op waardecreatie via buy-and-build.',
    excerpt:
      'Veel Nederlandse markten bestaan uit honderden kleine, sterke maar gefragmenteerde bedrijven. Voor de scherpe investeerder is dat een uitnodiging.',
    category: 'markt',
    publishedDate: '2026-05-27',
    body: [
      {
        type: 'p',
        text: 'In veel Nederlandse markten bestaat het speelveld uit honderden kleine, sterke maar gefragmenteerde bedrijven. Voor de buitenstaander oogt dat als versnippering. Voor de scherpe investeerder is het een uitnodiging: buy-and-build, de strategie waarmee losse schakels worden gebundeld tot een marktleider die meer is dan de som der delen.',
      },
      {
        type: 'li',
        text: 'Schaal creëert directe waarde. Gezamenlijke inkoop, gedeelde overhead en professioneel management tillen de marges van overgenomen bedrijven vrijwel meteen omhoog.',
      },
      {
        type: 'li',
        text: 'De multiple-arbitrage is reëel. Kleine bedrijven wisselen tegen lagere waarderingen van eigenaar dan het geconsolideerde geheel. Wie zorgvuldig bouwt, creëert waarde alleen al door slim samen te voegen.',
      },
      {
        type: 'li',
        text: 'Integratie is waar het spel wordt gewonnen of verloren. Niet het kopen, maar het verbinden — systemen, cultuur en processen — bepaalt of één plus één drie wordt. Discipline verslaat snelheid.',
      },
      {
        type: 'li',
        text: 'Consolidatie versterkt, mits gedreven door logica. De beste buy-and-builds volgen de waardeketen: elke overname maakt het geheel sterker, niet alleen groter.',
      },
      {
        type: 'p',
        text: 'First principles denken betekent hier: koop geen bedrijven, bouw een beter bedrijf. Wij benaderen consolidatie niet als financiële rekensom, maar als het geduldig samenbrengen van schakels die elkaar versterken. Met ondernemerservaring, hands-on betrokkenheid en langetermijnkapitaal maken we van versnippering een fundament voor duurzame, exponentiële groei.',
      },
    ],
  },
  {
    slug: 'first-principles-denken-in-een-complexe-economie',
    title:
      'Terug naar de kern: first principles denken als kompas in een complexe economie',
    metaDescription:
      'Onzekerheid verlamt of versnelt. Hoe first principles denken ondernemers helpt kansen te zien waar anderen ruis zien.',
    excerpt:
      'De economie oogt complexer dan ooit. Voor veel ondernemers voelt dat als ruis die verlamt. Toch is complexiteit vooral een oppervlakteverschijnsel.',
    category: 'markt',
    publishedDate: '2026-05-13',
    body: [
      {
        type: 'p',
        text: 'Rentestanden, geopolitiek, technologische disruptie, nieuwe regelgeving — de economie oogt complexer dan ooit. Voor veel ondernemers voelt dat als ruis die verlamt. Toch is complexiteit vooral een oppervlakteverschijnsel. Wie durft terug te gaan naar de eerste principes, ziet onder de ruis verrassend heldere kansen.',
      },
      {
        type: 'li',
        text: 'First principles betekent ontleden tot de kern. In plaats van te redeneren vanuit hoe het altijd ging, vraag je: wat is hier onmiskenbaar waar? Vanuit die bouwstenen ontstaat ruimte voor originele oplossingen.',
      },
      {
        type: 'li',
        text: 'Complexiteit schrikt de meesten af — en dat is de kans. Waar anderen afhaken vanwege onzekerheid, ontstaat ruimte voor wie de moeite neemt het probleem écht te begrijpen. Schaarste aan durf creëert voorsprong.',
      },
      {
        type: 'li',
        text: 'Fundamentele waarde overleeft elke cyclus. Trends komen en gaan, maar een bedrijf dat een echt probleem oplost tegen eerlijke kosten, houdt waarde in elk economisch klimaat.',
      },
      {
        type: 'li',
        text: 'Eenvoud is het eindresultaat, niet het startpunt. De krachtigste proposities zijn simpel aan de buitenkant, omdat iemand de complexiteit vanbinnen heeft doordacht en weggenomen.',
      },
      {
        type: 'p',
        text: 'Dat is precies onze werkwijze: complexiteit strippen tot de kern, begrijpen wat écht drijft, en vandaaruit bouwen. In een onzekere economie is dat geen luxe maar een kompas. Voor ondernemers met visie en skin in the game zijn de huidige tijden geen bedreiging, maar de vruchtbaarste bodem voor het bouwen van iets groots en blijvends.',
      },
    ],
  },
]

/** Geschatte leestijd op basis van ~200 woorden per minuut. */
export function estimateReadingMinutes(body: NewsBlock[]): number {
  const words = body.reduce(
    (total, block) => total + block.text.trim().split(/\s+/).length,
    0,
  )
  return Math.max(1, Math.round(words / 200))
}

type LexicalTextNode = {
  type: 'text'
  text: string
  format: number
  detail: number
  mode: 'normal'
  style: string
  version: number
}

type LexicalElementNode = {
  type: string
  children: unknown[]
  direction: 'ltr'
  format: ''
  indent: number
  version: number
  [k: string]: unknown
}

function textNode(text: string): LexicalTextNode {
  return {
    type: 'text',
    text,
    format: 0,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

/** Zet weergaveblokken om naar een Payload/Lexical rich-text waarde. */
export function blocksToLexical(body: NewsBlock[]): News['content'] {
  const children: LexicalElementNode[] = []
  let listBuffer: NewsBlock[] = []

  const flushList = () => {
    if (listBuffer.length === 0) return
    children.push({
      type: 'list',
      listType: 'bullet',
      tag: 'ul',
      start: 1,
      children: listBuffer.map((item, index) => ({
        type: 'listitem',
        value: index + 1,
        children: [textNode(item.text)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })
    listBuffer = []
  }

  for (const block of body) {
    if (block.type === 'li') {
      listBuffer.push(block)
      continue
    }
    flushList()
    if (block.type === 'h2') {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [textNode(block.text)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
    } else {
      children.push({
        type: 'paragraph',
        children: [textNode(block.text)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
    }
  }
  flushList()

  return {
    root: {
      type: 'root',
      children: children as unknown as News['content']['root']['children'],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** Leest platte tekst uit een Lexical-node (recursief). */
function extractText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const record = node as Record<string, unknown>
  if (typeof record.text === 'string') return record.text
  if (Array.isArray(record.children)) {
    return record.children.map(extractText).join('')
  }
  return ''
}

/** Zet een Payload/Lexical rich-text waarde om naar weergaveblokken. */
export function lexicalToBlocks(content: News['content'] | null | undefined): NewsBlock[] {
  const root = content?.root
  if (!root || !Array.isArray(root.children)) return []

  const blocks: NewsBlock[] = []
  for (const node of root.children as Record<string, unknown>[]) {
    const type = node?.type
    if (type === 'heading') {
      blocks.push({ type: 'h2', text: extractText(node) })
    } else if (type === 'list') {
      const items = Array.isArray(node.children) ? node.children : []
      for (const item of items) {
        blocks.push({ type: 'li', text: extractText(item) })
      }
    } else if (type === 'paragraph') {
      const text = extractText(node).trim()
      if (text) blocks.push({ type: 'p', text })
    }
  }
  return blocks
}
