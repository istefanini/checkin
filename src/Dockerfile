#stage 1
FROM node:16.14.0 as build
WORKDIR /app
COPY . .
RUN npm install
RUN node_modules/.bin/ng build --prod --base-href /ris-link/

#stage 2
FROM nginx:alpine
# Copiamos nuestro archivo de configuracion.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ris-link/ /usr/share/nginx/html
COPY --from=build /app/dist/ris-link/ /usr/share/nginx/html/ris-link
