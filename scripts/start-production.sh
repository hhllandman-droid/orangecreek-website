#!/usr/bin/env sh
set -u

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

exec npm start
