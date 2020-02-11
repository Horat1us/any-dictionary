FROM node:13-alpine AS build

WORKDIR /usr/src/app

COPY package-lock.json package.json ./
RUN npm i --no-audit
COPY src/ ./src/
COPY tsconfig.json .
RUN npm run build && \
    rm -r ./node_modules && \
    npm i --production --no-audit

FROM node:13-alpine

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules/ ./node_modules/
COPY --from=build /usr/src/app/dist/ ./dist/
COPY ./static/ ./static/
EXPOSE 3000
CMD ["./node_modules/.bin/nodemon", "./dist/index.js"]
