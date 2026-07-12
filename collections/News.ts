import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublished } from '@/access/adminOrPublished'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Nieuwsitem',
    plural: 'Nieuwsitems',
  },
  admin: {
    defaultColumns: ['title', 'category', 'status', 'publishedDate'],
    useAsTitle: 'title',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublished,
    update: adminOnly,
  },
  defaultSort: '-publishedDate',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    slugField({
      useAsSlug: 'title',
    }),
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Publicatiedatum',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Samenvatting',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhoud',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Uitgelichte afbeelding',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie',
      options: [
        { label: 'Bedrijfsnieuws', value: 'bedrijfsnieuws' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Markt', value: 'markt' },
        { label: 'Overig', value: 'overig' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Auteur',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: {
        initCollapsed: true,
      },
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
  timestamps: true,
}
