FROM node:latest

RUN npm install -g sails
COPY . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 1337

RUN npm install

CMD ["sails", "lift"]
