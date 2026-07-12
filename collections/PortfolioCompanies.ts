import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { publicRead } from '@/access/publicRead'

export const PortfolioCompanies: CollectionConfig = {
  slug: 'portfolio-companies',
  labels: {
    singular: 'Portefeuillebedrijf',
    plural: 'Portefeuillebedrijven',
  },
  admin: {
    defaultColumns: ['companyName', 'domainLabel', 'status', 'order'],
    useAsTitle: 'companyName',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: publicRead,
    update: adminOnly,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Bedrijfsnaam',
      required: true,
      unique: true,
    },
    slugField({
      useAsSlug: 'companyName',
    }),
    {
      name: 'domainLabel',
      type: 'text',
      label: 'Domein / tagline',
      admin: {
        description: 'Korte label op de website, bijv. "SaaS · workflow"',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Korte omschrijving',
    },
    {
      name: 'longDescription',
      type: 'richText',
      label: 'Uitgebreide omschrijving',
      editor: lexicalEditor(),
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'sector',
      type: 'select',
      label: 'Sector / branche',
      options: [
        { label: 'Zorg', value: 'zorg' },
        { label: 'Vastgoed', value: 'vastgoed' },
        { label: 'Tech', value: 'tech' },
        { label: 'Energie', value: 'energie' },
        { label: 'Logistiek', value: 'logistiek' },
        { label: 'Overig', value: 'overig' },
      ],
    },
    {
      name: 'investmentYear',
      type: 'number',
      label: 'Investeringsjaar',
      min: 1900,
      max: 2100,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'actief',
      options: [
        { label: 'Actief', value: 'actief' },
        { label: 'Exited', value: 'exited' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'revenueGrowth',
          type: 'text',
          label: 'Omzetgroei YoY',
          admin: { width: '33%' },
        },
        {
          name: 'ebitdaMargin',
          type: 'text',
          label: 'EBITDA-marge',
          admin: { width: '33%' },
        },
        {
          name: 'multiple',
          type: 'text',
          label: 'Multiple',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'keyMetrics',
      type: 'array',
      label: 'Overige kernstatistieken',
      fields: [
        {
          name: 'metricName',
          type: 'text',
          label: 'Naam',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Waarde',
          required: true,
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Eenheid',
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Locatie',
    },
    {
      name: 'connectedCompanies',
      type: 'relationship',
      relationTo: 'portfolio-companies',
      hasMany: true,
      label: 'Verbonden in waardeketen',
      admin: {
        description:
          'Selecteer welke andere deelnemingen verbonden zijn in de waardeketen-visualisatie.',
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        if (!id) return true
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },
    {
      name: 'chainPosition',
      type: 'group',
      label: 'Positie in ketengrafiek',
      admin: {
        description: 'X/Y in procenten (0–100) voor de waardeketen-weergave.',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'x',
          type: 'number',
          label: 'X (%)',
          min: 0,
          max: 100,
        },
        {
          name: 'y',
          type: 'number',
          label: 'Y (%)',
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Uitgelicht op homepage',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sorteervolgorde',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Bepaalt volgorde in ticker én index in ketengrafiek',
      },
    },
  ],
  timestamps: true,
}
