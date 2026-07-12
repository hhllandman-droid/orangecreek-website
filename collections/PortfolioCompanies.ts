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
    defaultColumns: ['companyName', 'sector', 'status', 'featured', 'order'],
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
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
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
      name: 'website',
      type: 'text',
      label: 'Website',
    },
    {
      name: 'sector',
      type: 'select',
      label: 'Sector',
      options: [
        { label: 'Zorg', value: 'zorg' },
        { label: 'Vastgoed', value: 'vastgoed' },
        { label: 'Tech', value: 'tech' },
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
        { label: 'In due diligence', value: 'in-due-diligence' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Locatie',
    },
    {
      name: 'keyMetrics',
      type: 'array',
      label: 'Kernstatistieken',
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
      name: 'featured',
      type: 'checkbox',
      label: 'Uitgelicht',
      defaultValue: false,
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
      },
    },
  ],
  timestamps: true,
}
