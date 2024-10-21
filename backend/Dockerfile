# Use Node.js slim version
FROM node:16-slim

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json from the backend folder to the container
COPY ./package*.json ./

COPY . .
# Install the dependencies
RUN npm install

#install curl for testing connectivity
RUN apt-get update && apt-get install -y curl && apt-get clean

# RUN apt install postgresql && apt install postgresql-contrib

# RUN psql -h postgres -U admin -W -d flor_de_sal

# Run the development server using npm
CMD ["npm", "run", "dev"]