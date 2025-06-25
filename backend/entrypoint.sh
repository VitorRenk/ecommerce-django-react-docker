#!/bin/sh

echo "Aguardando o banco ficar pronto..."

while ! nc -z db 5432; do
  sleep 1
done

echo "Banco conectado, rodando migrações..."

python manage.py migrate
exec python manage.py runserver 0.0.0.0:8000