FROM node:16-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

#install curl for testing connectivity
RUN apt-get update && apt-get install -y curl && apt-get clean 

CMD ["npm", "run", "build"]