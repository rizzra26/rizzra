# Stage 1: Build the Nuxt app
FROM node:18 AS base

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

FROM node:18 AS builder

RUN pnpm run build

FROM node:18 AS runner

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --prod

EXPOSE 3030

CMD ["pnpm", "run", "start", "-p", "3030"]