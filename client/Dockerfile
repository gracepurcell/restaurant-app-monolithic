# FROM node:16-slim

# WORKDIR /app

# COPY ./package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# #install curl for testing connectivity
# RUN apt-get update && apt-get install -y curl && apt-get clean 

# CMD ["npm", "run", "dev"]

FROM node:16-slim AS build 

WORKDIR /app

COPY ./package*.json ./

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

#install curl for testing connectivity
RUN apt-get update && apt-get install -y curl && apt-get clean 

CMD ["nginx", "-g", "daemon off;"]