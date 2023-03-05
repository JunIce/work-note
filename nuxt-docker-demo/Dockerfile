FROM node:18.14.2-slim

RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

COPY package*.json ./
RUN yarn install --registry=https://registry.npmmirror.com

COPY . .

RUN yarn build

EXPOSE 4000

ENV NITRO_HOST=0.0.0.0

ENV NITRO_PORT=4000

CMD [ "npm", "start" ]