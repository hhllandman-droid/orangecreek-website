import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrFirstUser, adminOrSelf, isAdmin } from '@/access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args) => {
        const token = args?.token ?? ''
        const user = args?.user
        const serverURL =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          process.env.RENDER_EXTERNAL_URL ||
          'https://orangecreek.co'
        const resetURL = `${serverURL.replace(/\/$/, '')}/admin/reset/${token}`

        return `
          <p>Hallo${user.name ? ` ${user.name}` : ''},</p>
          <p>Je hebt een verzoek ingediend om je wachtwoord voor het Orange Creek CMS te resetten.</p>
          <p><a href="${resetURL}">Klik hier om een nieuw wachtwoord in te stellen</a></p>
          <p>Of kopieer deze link in je browser:<br>${resetURL}</p>
          <p>Heb je dit niet aangevraagd? Negeer deze e-mail dan.</p>
        `
      },
      generateEmailSubject: () => 'Reset je Orange Creek CMS-wachtwoord',
    },
  },
  access: {
    admin: isAdmin,
    create: adminOrFirstUser,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['admin'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
