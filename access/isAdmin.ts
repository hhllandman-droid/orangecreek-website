import type { Access, AccessArgs } from 'payload'

import type { User } from '@/payload-types'

/** Alleen admins hebben toegang tot het admin panel. */
export const isAdmin = ({ req: { user } }: AccessArgs<User>): boolean => {
  return Boolean(user?.roles?.includes('admin'))
}

/** Staat aanmaken toe als er nog geen gebruikers zijn (first-user flow). */
export const adminOrFirstUser: Access<User> = async ({ req: { user, payload } }) => {
  if (user?.roles?.includes('admin')) {
    return true
  }

  const { totalDocs } = await payload.count({ collection: 'users' })
  return totalDocs === 0
}

/** Admins zien alle gebruikers; ingelogde gebruikers alleen hun eigen profiel. */
export const adminOrSelf: Access<User> = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) {
    return true
  }

  if (user) {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
