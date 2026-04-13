# Use a specific Node version
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app to generate dist
RUN npm run build

EXPOSE 5173

# Serve the built app
# --host 0.0.0.0 is crucial for external access
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
