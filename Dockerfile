FROM node:alpine as build-deps

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build --prod


FROM nginx:alpine
COPY --from=build-deps /usr/src/app/dist/liveresults-total /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./env.sh .
RUN apk add --no-cache bash
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
