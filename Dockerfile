# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies (including Prisma system requirements)
RUN apk add --no-cache openssl

# Copy package files and tsconfig first
COPY package*.json tsconfig.json ./

# Copy prisma schema
COPY prisma ./prisma

# Install all dependencies (including dev dependencies needed for build)
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Verify the build output exists
RUN ls -la dist || (echo "Build failed: dist directory not found" && exit 1)

# Stage 2: Run
FROM node:22-alpine
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache openssl

# Copy production files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Security hardening
RUN chown -R node:node /app && \
    find /app -type d -exec chmod 755 {} \; && \
    find /app -type f -exec chmod 644 {} \;

USER node

EXPOSE 5003
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:5003/supplier-service || exit 1

CMD ["node", "dist/index.js"]