import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type ResetBody = {
  secret?: string
  email?: string
  password?: string
}

export async function POST(request: Request) {
  const expectedSecret = process.env.ADMIN_RESET_SECRET?.trim()
  if (!expectedSecret) {
    return NextResponse.json(
      { error: 'Admin-reset is niet geconfigureerd.' },
      { status: 404 },
    )
  }

  let body: ResetBody
  try {
    body = (await request.json()) as ResetBody
  } catch {
    return NextResponse.json({ error: 'Ongeldige JSON-body.' }, { status: 400 })
  }

  if (!body.secret || body.secret !== expectedSecret) {
    return NextResponse.json({ error: 'Onjuist reset-geheim.' }, { status: 403 })
  }

  const password = body.password?.trim()
  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: 'Geef een wachtwoord van minimaal 8 tekens op.' },
      { status: 400 },
    )
  }

  const emailFilter = body.email?.trim().toLowerCase()
  const payload = await getPayloadClient()

  const users = await payload.find({
    collection: 'users',
    limit: 50,
    overrideAccess: true,
    pagination: false,
    ...(emailFilter
      ? {
          where: {
            email: {
              equals: emailFilter,
            },
          },
        }
      : {}),
  })

  if (users.totalDocs === 0) {
    return NextResponse.json(
      { error: 'Geen gebruiker gevonden.' },
      { status: 404 },
    )
  }

  const target =
    users.docs.find((user) => user.roles?.includes('admin')) ?? users.docs[0]

  await payload.update({
    collection: 'users',
    id: target.id,
    data: {
      password,
    },
    overrideAccess: true,
  })

  return NextResponse.json({
    ok: true,
    email: target.email,
    message: 'Wachtwoord bijgewerkt. Verwijder ADMIN_RESET_SECRET na gebruik.',
  })
}
