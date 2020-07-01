FROM node:12-alpine

ENV NODE_ENV production

COPY . /bot

WORKDIR /bot

RUN yarn

ENTRYPOINT yarn start
