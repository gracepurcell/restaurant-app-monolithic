ARG EXTERNAL_IP="http://localhost:6001" 

FROM node:16-slim AS base
WORKDIR /app
COPY ./package*.json ./
COPY . .
RUN npm install


FROM base AS dev
EXPOSE  5173
CMD ["npm", "run", "dev"]

FROM base AS build
RUN VITE_SERVER_URL=$EXTERNAL_IP npm run build 

FROM nginx:latest as deploy
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173

#install curl for testing connectivity
RUN apt-get update && apt-get install -y curl && apt-get clean 

CMD ["nginx", "-g", "daemon off;"]