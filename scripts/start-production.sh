#!/usr/bin/env sh
set -u

echo "Ensuring database schema..."
if npx tsx scripts/ensure-schema.ts; then
  echo "Schema ensure complete."
else
  echo "WARNING: ensure-schema failed — continuing startup."
fi

echo "Running database migrations..."
if npm run migrate; then
  echo "Migrations complete."
else
  echo "WARNING: migrations failed — starting app anyway so the site stays reachable."
fi

echo "Seeding portfolio data if empty..."
if npm run seed; then
  echo "Seed complete."
else
  echo "WARNING: seed failed — continuing startup."
fi

if [ -n "${ADMIN_RESET_PASSWORD:-}" ]; then
  echo "Resetting admin password..."
  if npx tsx scripts/reset-admin-password.ts; then
    echo "Admin password reset complete."
  else
    echo "WARNING: admin password reset failed — continuing startup."
  fi
fi

exec npm run start:next
