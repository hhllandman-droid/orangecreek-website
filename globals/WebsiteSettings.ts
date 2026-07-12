import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { adminOnly } from '@/access/adminOnly'
import { publicRead } from '@/access/publicRead'

export const WebsiteSettings: GlobalConfig = {
  slug: 'website-settings',
  label: 'Website-instellingen',
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Bedrijfsnaam',
      defaultValue: 'Orange Creek Capital',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'companyDescription',
      type: 'richText',
      label: 'Bedrijfsomschrijving',
      editor: lexicalEditor(),
    },
    {
      type: 'collapsible',
      label: 'Contact',
      fields: [
        {
          name: 'contactEmail',
          type: 'email',
          label: 'E-mailadres',
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Telefoonnummer',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Adres',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Social media',
      fields: [
        {
          name: 'linkedInUrl',
          type: 'text',
          label: 'LinkedIn URL',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'SEO (homepage)',
      fields: [
        {
          name: 'seoTitle',
          type: 'text',
          label: 'SEO-titel',
        },
        {
          name: 'seoDescription',
          type: 'textarea',
          label: 'SEO-beschrijving',
        },
      ],
    },
  ],
}
