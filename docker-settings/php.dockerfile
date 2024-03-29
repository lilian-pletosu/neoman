# Utilizați o imagine PHP mai recentă
FROM php:8.2-fpm-alpine

# Setarea unei variabile de argument (uuid)
ARG uid
# Exponați portul specificat prin variabila uuid
EXPOSE $uid

USER 1000:1000

# Instalarea Composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/var/www/html --filename=composer && \
    rm -rf composer-setup.php

# Creați directorul pentru site
RUN mkdir -p /var/www/html

RUN chown -R www-data:www-data /usr/local/bin



# Instalarea extensiilor PHP (pdo, pdo_mysql si exif)
# Instalarea extensiilor PHP (pdo, pdo_mysql si exif)
RUN apk --no-cache add shadow && \
    docker-php-ext-install pdo pdo_mysql exif && \
    usermod -s /bin/bash www-data && \
    apk update && apk add libpng-dev libzip-dev && \
    docker-php-ext-install gd zip



# Instalarea extensiilor PHP (gd și zip)
RUN apk update && apk add libpng-dev libzip-dev && \
    docker-php-ext-install gd zip

# Comentați secțiunea xdebug (dacă nu este necesară)
# Acest lucru trebuie să apară înaintea următoarei comenzi docker-php-source
#RUN echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini && \
#    echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Instalarea extensiei Redis
ENV EXT_REDIS_VERSION=5.3.4
RUN mkdir -p /usr/src/php/ext/redis && \
    curl -fsSL https://github.com/phpredis/phpredis/archive/$EXT_REDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 && \
    docker-php-ext-configure redis && \
    docker-php-ext-install redis

# Curățați resursele după instalare
RUN docker-php-source delete

