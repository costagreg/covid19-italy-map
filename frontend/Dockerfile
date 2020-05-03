FROM node:13.8.0

WORKDIR /usr/app

COPY . .

RUN npm install && npm run prod

CMD [ "node", "static/server.js" ]