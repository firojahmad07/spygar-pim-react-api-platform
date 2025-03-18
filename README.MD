## Installation
```
- composer install
- yarn install
- php bin/console spygar:pim:install
```

## Generate jwt pem files
```
- openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
- openssl rsa -in private.pem -pubout -out public.pem
```
