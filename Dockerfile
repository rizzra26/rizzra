# Stage 1: Build the Nuxt app
FROM node:16 AS build

WORKDIR /app

COPY package.json package-lock.json* ./ 

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3030

CMD ["pnpm", "start"]