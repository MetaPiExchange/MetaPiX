# Use official Node.js 16 image
FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy dependency files first for better caching
COPY package.json yarn.lock ./

# Install dependencies using yarn with lockfile to ensure consistency
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY .env .env

# Build the TypeScript app
RUN yarn build

# Install PM2 globally for process management
RUN yarn global add pm2

# Copy the PM2 process config
COPY ./docker/processes.config.js ./processes.config.js

# Create log folder (PM2 will write logs here)
RUN mkdir -p log && touch log/.keep

# Expose the port your backend listens on (default is 8080)
EXPOSE 8080

# Start the app with PM2
CMD ["pm2-runtime", "./processes.config.js"]
