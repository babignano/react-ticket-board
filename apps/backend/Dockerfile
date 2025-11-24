# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files for workspace resolution
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

# Install only backend workspace dependencies
RUN npm ci --workspace=@react-ticket-board/backend

# Copy backend source code
COPY apps/backend ./apps/backend

# Build TypeScript
WORKDIR /app/apps/backend
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

# Install only production dependencies for backend
RUN npm ci --workspace=@react-ticket-board/backend --omit=dev

# Copy built files from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

WORKDIR /app/apps/backend

# Expose port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Run the server
CMD ["node", "dist/index.js"]
