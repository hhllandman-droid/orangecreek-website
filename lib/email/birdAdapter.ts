import type { EmailAdapter, SendEmailOptions } from 'payload'

type BirdAdapterOptions = {
  apiKey: string
  workspaceId: string
  channelId: string
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

export function birdEmailAdapter(options: BirdAdapterOptions): EmailAdapter {
  const apiBase = (options.apiBase ?? 'https://api.bird.com').replace(/\/$/, '')
  const endpoint = `${apiBase}/workspaces/${options.workspaceId}/channels/${options.channelId}/messages`

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

      const sender: { emailAddress: string; displayName?: string } = {
        emailAddress: fromEmail,
      }
      if (fromName) {
        sender.displayName = fromName
      }

      const body = html
        ? { type: 'html' as const, html: { html, text: text || html.replace(/<[^>]+>/g, '') } }
        : { type: 'text' as const, text: { text: text || message.subject || '' } }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `AccessKey ${options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver: {
            contacts: [
              {
                identifierKey: 'emailaddress',
                identifierValue: toEmail,
              },
            ],
          },
          sender,
          subject: message.subject ?? 'Bericht van Orange Creek',
          body,
        }),
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
  return Boolean(
    process.env.BIRD_API_KEY &&
      process.env.BIRD_WORKSPACE_ID &&
      process.env.BIRD_CHANNEL_ID &&
      process.env.BIRD_FROM_EMAIL,
  )
}
