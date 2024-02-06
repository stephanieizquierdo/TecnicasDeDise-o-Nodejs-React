from node:16 AS ui-build

WORKDIR /front
COPY front/package*.json ./
RUN npm install
COPY front/src/ ./src
COPY front/public/ ./public
COPY front/tsconfig.json ./
RUN npm run build
EXPOSE 3000


FROM node:16 AS back-build

WORKDIR /
COPY --from=ui-build /front/build/ ./client/build
WORKDIR /BACK
COPY BACK/package*.json ./
RUN npm install

COPY BACK/.env ./
COPY BACK/tsconfig.json ./
COPY BACK/index.ts ./
COPY BACK/src/ ./src
COPY BACK/res/ ./res

ENV NODE_ENV=production

EXPOSE 4000

CMD ["npm", "start"]