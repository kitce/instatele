FROM node:12-alpine

COPY . /bot

WORKDIR /bot

RUN yarn

RUN yarn build

ENTRYPOINT yarn start
