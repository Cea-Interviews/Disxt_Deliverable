FROM node:10-alpine as base

WORKDIR /app
COPY package*.json ./
COPY . ./
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN npm install nodemon
RUN npm install
CMD ["npm", "run" , "start:dev"]

FROM  base as prod
RUN npm install --only=production
CMD ["npm", "start"]