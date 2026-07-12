import type { Access } from 'payload'

import type { User } from '@/payload-types'

/** Alleen admins mogen documenten aanmaken, wijzigen of verwijderen. */
export const adminOnly: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}
