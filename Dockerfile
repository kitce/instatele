FROM node:14-alpine

COPY . /bot

WORKDIR /bot

RUN yarn

RUN yarn build

CMD ["yarn", "start"]
