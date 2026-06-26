# Build stage: install dependencies and create the Vite build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifest files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app sources and build static assets
COPY . .
RUN npm run build

# Runtime stage: production image for Express API server
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy compiled build output and server files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/email.js ./email.js

EXPOSE 4000
CMD ["node", "index.js"]
