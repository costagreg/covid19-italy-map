FROM node:13.8.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "prod" ]