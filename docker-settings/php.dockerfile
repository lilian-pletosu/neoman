
# Utilizați o imagine PHP mai recentă
FROM php:8.2-fpm-alpine

#setting an argument
ARG uuid
EXPOSE $uuid

# Installing composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN rm -rf composer-setup.php


RUN mkdir -p /var/www/html

#using the argument
RUN apk --no-cache add shadow && usermod -u $uuid www-data

RUN docker-php-ext-install pdo pdo_mysql

# using gd lib and zip lib
RUN apk update  && apk add  libpng-dev
RUN apk update && \
    apk add \
        libzip-dev

RUN docker-php-ext-install gd
RUN docker-php-ext-install zip
RUN docker-php-ext-install exif

# Comment out the xdebug section
# it looks like it is important this comes before docker-php-source redis the next command
# RUN apk add --no-cache $PHPIZE_DEPS \
#    && pecl install xdebug \
#    && docker-php-ext-enable xdebug\
#    && echo "xdebug.mode=develop,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
#    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
#    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
#    && echo "xdebug.discover_client_host=0" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini


ENV EXT_REDIS_VERSION=5.3.4
RUN docker-php-source extract \
    # redis
    && mkdir -p /usr/src/php/ext/redis \
    && curl -fsSL https://github.com/phpredis/phpredis/archive/$EXT_REDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && docker-php-ext-configure redis \
    && docker-php-ext-install redis \
    # cleanup
    && docker-php-source delete \
