FROM node:16

RUN apt update -y
RUN apt install rsync -y

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/app.js" ]


