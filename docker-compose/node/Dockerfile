FROM node:18.14.2-alpine3.17
WORKDIR /tmp

COPY ./node/package.json /tmp/package.json
COPY ./node/index.js /tmp/index.js

RUN yarn install --registry=https://registry.npmmirror.com

CMD ["npm","run", "start"]