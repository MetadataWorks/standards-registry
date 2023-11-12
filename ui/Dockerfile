FROM node:16-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production --include-optional --ignore-scripts

COPY --chown=node:node . /app

RUN npm run build

USER node

CMD npm start
