FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build project
RUN npm run build

# Install lightweight server to serve build
RUN npm install -g serve

EXPOSE 5173

# Serve production build
CMD ["serve", "-s", "dist", "-l", "5173"]