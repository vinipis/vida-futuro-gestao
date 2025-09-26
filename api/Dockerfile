FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl
COPY api/package*.json api/tsconfig.json api/prisma ./
RUN npm ci && npx prisma generate
COPY api ./
RUN npm run build
EXPOSE 8080
ENV NODE_ENV=production
CMD ["npm","start"]
