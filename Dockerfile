# Stage build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run build

# Stage runtime
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
# Só execute migrate deploy aqui (NUNCA db push para produção)
# Use o binário diretamente para não depender do npm/npx ler package.json
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && npm run start:prod"]