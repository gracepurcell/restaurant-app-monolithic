
FROM node:18-slim AS base
WORKDIR /app
COPY ./package*.json ./
COPY . .
RUN npm install

FROM base AS dev
EXPOSE  5173
CMD ["npm", "run", "dev"]

FROM base AS build
ARG EXTERNAL_IP
ENV VITE_SERVER_URL=http://a41bbf6ede721479d8808877134b9d04-2041381634.eu-west-2.elb.amazonaws.com:6001
RUN npm run build 

FROM nginx:latest AS deploy
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173

#install curl for testing connectivity
RUN apt-get update && apt-get install -y curl && apt-get clean 

CMD ["nginx", "-g", "daemon off;"]
