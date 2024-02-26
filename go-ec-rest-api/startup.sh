#!/bin/sh

echo 'Exec db:migrate ' `date`
go run /app/migrate/migrate.go

echo 'Start server ' `date`
air -c /app/.air.toml