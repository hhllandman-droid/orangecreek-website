import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { News } from './collections/News'
import { PortfolioCompanies } from './collections/PortfolioCompanies'
import { Users } from './collections/Users'
import { WebsiteSettings } from './globals/WebsiteSettings'
import { birdEmailAdapter, isBirdEmailConfigured } from './lib/email/birdAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.RENDER_EXTERNAL_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Orange Creek CMS',
      description: 'Contentbeheer voor Orange Creek Capital',
    },
  },
  collections: [Users, Media, PortfolioCompanies, News],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  globals: [WebsiteSettings],
  secret: process.env.PAYLOAD_SECRET || '',
  debug: process.env.PAYLOAD_DEBUG === 'true',
  ...(isBirdEmailConfigured()
    ? {
        email: birdEmailAdapter({
          apiKey: process.env.BIRD_API_KEY || '',
          defaultFromAddress: process.env.BIRD_FROM_EMAIL || '',
          defaultFromName: process.env.BIRD_FROM_NAME || 'Orange Creek',
          apiBase: process.env.BIRD_API_BASE,
        }),
      }
    : {}),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
