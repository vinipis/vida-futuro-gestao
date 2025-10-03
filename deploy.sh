#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/vidaefuturo/repos/vida-futuro-gestao"
COMPOSE_FILE="$PROJECT_DIR/docker-compose.yml"
ENV_FILE="$PROJECT_DIR/.env"
COMPOSE="docker compose --env-file \"$ENV_FILE\" -f \"$COMPOSE_FILE\""

echo "==> Deploy Vida & Futuro 🚀"

# 0) Pré-requisitos
if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ .env não encontrado em $ENV_FILE"; exit 1
fi
if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "❌ docker-compose.yml não encontrado em $COMPOSE_FILE"; exit 1
fi

# 1) Validar variáveis mínimas
req_vars=(POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB FRONTEND_ORIGIN JWT_SECRET)
for v in "${req_vars[@]}"; do
  if ! grep -qE "^$v=" "$ENV_FILE"; then
    echo "❌ Variável obrigatória ausente no .env: $v"; exit 1
  fi
  if [[ -z "$(grep -E "^$v=" "$ENV_FILE" | cut -d= -f2-)" ]]; then
    echo "❌ Variável $v está vazia no .env"; exit 1
  fi
done

# 2) Atualizar código
echo "==> Atualizando repositório..."
cd "$PROJECT_DIR"
git fetch origin
# Servidor: manter cópia idêntica ao main remoto
git reset --hard origin/main
git clean -fd

# 3) Build (puxando imagens base novas)
echo "==> Buildando imagens..."
eval $COMPOSE build --pull

# 4) Subir serviços
echo "==> Subindo containers..."
eval $COMPOSE up -d

# 5) Aplicar schema Prisma (safe se a API já estiver de pé)
echo "==> Aplicando schema no Postgres (Prisma db push)..."
eval $COMPOSE exec api npx prisma db push --schema prisma/schema.prisma || true

# 6) Status e logs
echo "==> Containers ativos:"
eval $COMPOSE ps

echo "==> Últimos logs do web:"
eval $COMPOSE logs --tail=40 web || true

echo "==> Últimos logs do api:"
eval $COMPOSE logs --tail=40 api || true

echo "✅ Deploy concluído!"