# Use an official Node.js runtime as the base image
FROM node:22.12

# Set the working directory inside the container
WORKDIR /frontend
# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./
COPY vite.config.ts ./
# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to build and serve the app
CMD ["npm", "run", "dev"]
