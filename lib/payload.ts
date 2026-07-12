import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Herbruikbare Payload-client voor Server Components, Server Actions en API routes.
 * Cached per request in development via Payload's interne HMR-ondersteuning.
 */
export async function getPayloadClient() {
  return getPayload({ config })
}
