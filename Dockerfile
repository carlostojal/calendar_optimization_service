FROM node:20.3.1-alpine3.17

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]
