FROM node:10.23.1-alpine3.9

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./ ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "run dev" ]