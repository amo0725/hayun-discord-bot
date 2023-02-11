FROM node:18-alpine As build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY . .

RUN npm run build

CMD npm run start:prod