FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

COPY api /app/api
WORKDIR /app/api

RUN npm install
RUN npx prisma validate --schema prisma/schema.prisma
RUN npx prisma generate --schema prisma/schema.prisma
RUN npm run build

EXPOSE 8080
ENV NODE_ENV=production
CMD ["npm","start"]