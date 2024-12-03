
# Neoman


## Requirments:
##### npm
##### Docker




## Deployment

To deploy this project run

```bash
  cd proxy
  docker compose up -d --build
  cd ../
  docker compose up -d --build
  cp .env.example .env
  docker compose exec neoman-php sh
  composer install
  php artisan key:generate
```

