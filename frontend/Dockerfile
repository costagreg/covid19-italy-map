FROM node:13.8.0

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run prod

EXPOSE 8080

CMD [ "node", "static/server.js" ]