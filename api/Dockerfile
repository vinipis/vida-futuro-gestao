FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

# copia a API inteira para /app/api
COPY api /app/api

WORKDIR /app/api

# garante versões do prisma/@prisma/client instaladas
RUN npm install

# gera o client usando o schema correto
RUN npx prisma generate --schema prisma/schema.prisma

# compila TS
RUN npm run build

EXPOSE 8080
ENV NODE_ENV=production
CMD ["npm","start"]
