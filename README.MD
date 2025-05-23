## Setup System
`docker-compose up --build -d`

## Acess php container
`docker exec -it spygar-php bash`

## Database and Schema Setup instructions
   - php bin/console d:s:u -f
   - php bin/console doctrine:fixtures:load

## Create new roles and Users
- php bin/console spygar:create:user

## To Access store
`localhost:8080`

## To Access Admin
`localhost:8080/admin`


## Installation
```
- composer install
- yarn install
- php bin/console spygar:pim:install
```
## Important commands
```
php bin/console spygar:pim:install
```
## Generate jwt pem files
```
- openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
- openssl rsa -in private.pem -pubout -out public.pem
```