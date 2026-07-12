import type { Access } from 'payload'

import type { User } from '@/payload-types'

/** Admins zien alles; bezoekers alleen gepubliceerde nieuwsitems. */
export const adminOrPublished: Access<User> = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}
