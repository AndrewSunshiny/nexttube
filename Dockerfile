# Base image
FROM docker.io/oven/bun:alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Runner stage
FROM base AS runner
ENV NODE_ENV=production
ENV PORT 3030
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3030

CMD ["bun", "server.js"]
