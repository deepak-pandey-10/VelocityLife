FROM node:20

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of backend code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Use correct port (Render and other platforms override PORT env var)
EXPOSE 3000

# Start server
CMD ["node", "src/index.js"]