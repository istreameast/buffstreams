# ---- BUILD STAGE ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js for production
RUN npm run build

# ---- RUN STAGE ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy production files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]
