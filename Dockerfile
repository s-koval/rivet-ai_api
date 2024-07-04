FROM node:18-alpine as builder

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/package*.json ./
COPY --from=builder --chown=node:node /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /usr/src/app/dist/ ./dist/

CMD ["node", "dist/main.js"]
