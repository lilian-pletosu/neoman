FROM nginx:1.25.2-alpine-slim

ADD ./nginx.default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/html
