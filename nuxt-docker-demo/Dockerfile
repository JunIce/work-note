FROM node:18.14.2-slim as Builder

RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

COPY package*.json ./
RUN yarn install --registry=https://registry.npmmirror.com

COPY . .

RUN yarn build


FROM node:18.14.2-slim

EXPOSE 4000

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=4000

RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

COPY --from=Builder /var/www/nuxt-app/.output /var/www/nuxt-app

CMD [ "node", "./server/index.mjs" ]