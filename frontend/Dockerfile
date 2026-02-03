# Simple Frontend Dockerfile for Development/Preview
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the app to generate dist
RUN npm run build

EXPOSE 5173

# Serve the built app suitable for a simple production test
# Using vite preview or a static server
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
