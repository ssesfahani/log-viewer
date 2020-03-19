FROM node:10.7 as dist
WORKDIR /tmp/
COPY package.json package-lock.json ormconfig.json tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN npm install
RUN npm run build

FROM node:10.7 as node_modules
WORKDIR /tmp/
COPY package.json package-lock.json ./
RUN npm install --production

FROM node:10.7
WORKDIR /usr/local/app
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
CMD ["node", "dist/main.js"]
