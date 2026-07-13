import 'dotenv/config'

import { getPayloadClient } from '../lib/payload'

async function resetAdminPassword() {
  const password = process.env.ADMIN_RESET_PASSWORD?.trim()
  if (!password) {
    console.log('ADMIN_RESET_PASSWORD niet gezet — wachtwoordreset overgeslagen.')
    process.exit(0)
  }

  const emailFilter = process.env.ADMIN_EMAIL?.trim().toLowerCase()
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
    console.error(
      emailFilter
        ? `Geen gebruiker gevonden met e-mail ${emailFilter}.`
        : 'Geen gebruikers gevonden in de database.',
    )
    process.exit(1)
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

  console.log(`Wachtwoord gereset voor ${target.email} (id ${target.id}).`)

  if (process.env.ADMIN_RESET_CLEAR === 'true') {
    console.log(
      'Tip: verwijder ADMIN_RESET_PASSWORD uit de omgeving na inloggen.',
    )
  }

  process.exit(0)
}

resetAdminPassword().catch((error) => {
  console.error('Wachtwoordreset mislukt:', error)
  process.exit(1)
})
