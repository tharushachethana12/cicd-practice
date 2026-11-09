# Step 1: Base image
FROM node:22-alpine AS base

WORKDIR /app

# Step 2: Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Step 3: Copy application source code
COPY src ./src

# Step 4: Security best practice - run as non-root user
USER node

# Step 5: Expose application port
EXPOSE 3000

# Step 6: Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Step 7: Start application
CMD ["node", "src/server.js"]
