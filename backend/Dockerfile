# Use the full Node image for better stability on Apple Silicon
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and Prisma schema
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Final setup
EXPOSE 5001

CMD ["node", "src/index.js"]
