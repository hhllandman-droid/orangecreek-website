#!/usr/bin/env sh
set -u

echo "Running database migrations..."
if npm run migrate; then
  echo "Migrations complete."
else
  echo "WARNING: migrations failed — starting app anyway so the site stays reachable."
fi

exec npm start
