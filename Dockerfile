FROM node:10-alpine as base

WORKDIR /src
COPY package*.json ./
COPY . ./
EXPOSE 3000
RUN npm clean cache --force

FROM base as dev
ENV NODE_ENV=development
RUN npm install nodemon
RUN npm install
CMD ["npm", "run" , "start:dev"]

FROM  base as prod
RUN npm install --only=production
CMD ["npm", "start"]