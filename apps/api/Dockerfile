# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY packages/db/package.json ./packages/db/
COPY packages/utils/package.json ./packages/utils/
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/types ./packages/types
COPY packages/db ./packages/db
COPY packages/utils ./packages/utils
COPY apps/api ./apps/api
COPY tsconfig.json ./

# Build packages and API
RUN pnpm --filter @pricewatch/types build
RUN pnpm --filter @pricewatch/db build
RUN pnpm --filter @pricewatch/utils build
RUN pnpm --filter @pricewatch/api build

# Production stage
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/packages/types/package.json ./packages/types/
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/db/package.json ./packages/db/
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/utils/package.json ./packages/utils/
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

USER nestjs

EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000

CMD ["node", "apps/api/dist/main.js"]
