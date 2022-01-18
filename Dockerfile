FROM node:17-alpine3.14

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
