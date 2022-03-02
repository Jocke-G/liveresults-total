FROM node:alpine as build-deps

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build --prod


FROM nginx:alpine
COPY --from=build-deps /usr/src/app/dist/liveresults-total /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
