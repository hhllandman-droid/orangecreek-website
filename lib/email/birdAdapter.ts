import type { EmailAdapter, SendEmailOptions } from 'payload'

type BirdAdapterOptions = {
  apiKey: string
  defaultFromAddress: string
  defaultFromName: string
  apiBase?: string
}

function resolveRecipient(to: SendEmailOptions['to']): string | null {
  if (!to) return null
  if (typeof to === 'string') return to
  if (Array.isArray(to)) {
    const first = to[0]
    if (typeof first === 'string') return first
    if (first && typeof first === 'object' && 'address' in first) {
      return first.address
    }
  }
  if (typeof to === 'object' && 'address' in to) {
    return to.address
  }
  return null
}

function resolveFromAddress(
  from: SendEmailOptions['from'],
  defaultAddress: string,
): string {
  if (!from) return defaultAddress
  if (typeof from === 'string') {
    const match = from.match(/<([^>]+)>/)
    return match?.[1] ?? from
  }
  if (typeof from === 'object' && 'address' in from) {
    return from.address
  }
  return defaultAddress
}

function resolveFromName(
  from: SendEmailOptions['from'],
  defaultName: string,
): string | undefined {
  if (!from) return defaultName
  if (typeof from === 'string') {
    const match = from.match(/^"([^"]+)"/)
    return match?.[1] ?? defaultName
  }
  if (typeof from === 'object' && 'name' in from && from.name) {
    return from.name
  }
  return defaultName
}

function resolveApiBase(apiKey: string, explicitBase?: string): string {
  if (explicitBase?.trim()) {
    return explicitBase.replace(/\/$/, '')
  }

  if (apiKey.includes('_eu1_')) {
    return 'https://eu1.platform.bird.com'
  }

  if (apiKey.includes('_us1_')) {
    return 'https://us1.platform.bird.com'
  }

  // Frankfurt-deploy + eu1.smtp.bird.com in Bird-dashboard
  return 'https://eu1.platform.bird.com'
}

function formatFromHeader(name: string | undefined, address: string): string {
  if (name?.trim()) {
    return `${name.trim()} <${address}>`
  }
  return address
}

export function birdEmailAdapter(options: BirdAdapterOptions): EmailAdapter {
  const apiBase = resolveApiBase(options.apiKey, options.apiBase)
  const endpoint = `${apiBase}/v1/email/messages`

  return () => ({
    name: 'bird',
    defaultFromAddress: options.defaultFromAddress,
    defaultFromName: options.defaultFromName,
    sendEmail: async (message) => {
      const toEmail = resolveRecipient(message.to)
      if (!toEmail) {
        throw new Error('Bird e-mail: geen ontvanger opgegeven.')
      }

      const fromEmail = resolveFromAddress(message.from, options.defaultFromAddress)
      const fromName = resolveFromName(message.from, options.defaultFromName)
      const text = typeof message.text === 'string' ? message.text : ''
      const html = typeof message.html === 'string' ? message.html : undefined

      const payload: Record<string, string | string[]> = {
        from: formatFromHeader(fromName, fromEmail),
        to: [toEmail],
        subject: message.subject ?? 'Bericht van Orange Creek',
      }

      if (html) {
        payload.html = html
        payload.text = text || html.replace(/<[^>]+>/g, '')
      } else {
        payload.text = text || message.subject || ''
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const detail = (await response.text()).slice(0, 500)
        throw new Error(`Bird e-mail mislukt (${response.status}): ${detail}`)
      }

      try {
        return await response.json()
      } catch {
        return { status: response.status }
      }
    },
  })
}

export function isBirdEmailConfigured(): boolean {
  return Boolean(process.env.BIRD_API_KEY && process.env.BIRD_FROM_EMAIL)
}
