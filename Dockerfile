FROM node:12-alpine

COPY . /bot

WORKDIR /bot

RUN yarn

ENTRYPOINT yarn start
