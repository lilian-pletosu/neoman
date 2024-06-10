# Utilizați o imagine PHP mai recentă
FROM php:8.2-fpm-alpine

# Setează un argument
ARG uuid
EXPOSE $uuid

# Instalarea Composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm -rf composer-setup.php

RUN mkdir -p /var/www/html

# Folosirea argumentului
RUN apk --no-cache add shadow && usermod -u $uuid www-data

# Instalare extensii PDO
RUN docker-php-ext-install pdo pdo_mysql

# Copiază fișierul php.ini
COPY ./php.ini /usr/local/etc/php/php.ini

# Instalarea librăriilor necesare și a extensiilor PHP
RUN apk update && \
     apk add --no-cache \
         libzip-dev \
         libxml2-dev \
         libpng-dev \
         libjpeg-turbo-dev \
         libwebp-dev \
         libxpm-dev \
         freetype-dev \
         icu-dev \
         oniguruma-dev \
         g++ \
         autoconf \
         make && \
     docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm && \
     docker-php-ext-install -j$(nproc) gd zip exif soap bcmath intl

# Instalare și configurare extensie Redis
ENV EXT_REDIS_VERSION=5.3.4
RUN docker-php-source extract \
    && mkdir -p /usr/src/php/ext/redis \
    && curl -fsSL https://github.com/phpredis/phpredis/archive/$EXT_REDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && docker-php-ext-configure redis \
    && docker-php-ext-install redis \
    && docker-php-source delete

# Curățare pachete de dezvoltare pentru a reduce dimensiunea imaginii
RUN apk del g++ autoconf make
