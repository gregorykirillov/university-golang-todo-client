FROM nginx

WORKDIR /usr/src/app
COPY ./configs/nginx.conf /etc/nginx/nginx.conf
COPY ./dist ./assets

EXPOSE 8080