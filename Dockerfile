#?================ PARTE 1 ================
FROM node:23.8.0-alpine3.21 AS deps

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

#?================ PARTE 2 ================
FROM node:23.8.0-alpine3.21 AS build

WORKDIR /usr/src/app

#Copiar de deps, los modulos de node
COPY --from=deps /usr/src/app/node_modules ./node_modules

#Copiar todo el codigo fuente
COPY . .

RUN npm run build

#Solo dejo la dependencia de Producion
RUN npm ci -f --only=production && npm cache clean --force

#?================ PARTE 3 ================
# Crear la imagen final de Docker
FROM node:23.8.0-alpine3.21 AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

#Copiar la carperta de DIST
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
