# Stage 1: Build the React Application
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final Image (Hybrid: Node.js Backend + Python Tools)
FROM node:18-bullseye-slim

# Install Python 3 and pip for the "Studio" tools
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Node.js dependencies and source
COPY package*.json ./
RUN npm install --production
COPY api ./api
COPY server.cjs ./

# Copy built frontend assets from Stage 1
COPY --from=builder /app/dist ./dist

# Copy Python tools and install dependencies
COPY tools ./tools
RUN pip3 install -r tools/python/requirements.txt

# Environment defaults
ENV PORT=3000
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start "All-in-One" server
CMD ["node", "server.cjs"]
