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
      type: 'collapsible',
      label: 'Homepage hero',
      fields: [
        {
          name: 'heroEyebrow',
          type: 'text',
          label: 'Hero eyebrow',
          defaultValue: 'Participatiemaatschappij · van ondernemers, voor ondernemers',
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: 'Hero titel',
        },
        {
          name: 'heroHighlight',
          type: 'text',
          label: 'Hero highlight (geaccentueerd deel)',
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: 'Hero beschrijving',
        },
        {
          name: 'heroCtaLabel',
          type: 'text',
          label: 'CTA-knop tekst',
          defaultValue: 'Neem contact op',
        },
        {
          name: 'heroCtaUrl',
          type: 'text',
          label: 'CTA-knop URL',
          defaultValue: '#contact',
        },
      ],
    },
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
      label: 'Portfolio sectie',
      fields: [
        {
          name: 'portfolioTitle',
          type: 'text',
          label: 'Portfolio titel',
          defaultValue: '8 bedrijven, één waardeketen.',
        },
        {
          name: 'portfolioDisclaimer',
          type: 'textarea',
          label: 'Portfolio disclaimer',
          defaultValue:
            'Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen.',
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
