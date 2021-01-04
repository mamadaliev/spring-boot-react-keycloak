# keycloak-spring-boot-demo

## Step 1. Install keycloak
To install the Keycloak as a service with docker, execute the following line in your terminal:
```
docker run -p 7070:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak
```

Or you can up the keycloak service with docker compose, using `docker-compose up` command.
```yaml
# docker-compose.yaml

version: '3'

services:
  postgres:
    image: postgres:11.1
    container_name: postgres
    networks:
      - net
    ports:
      - 5432:5432
    volumes:
      - ./.postgres-data:/var/lib/postgresql/data:rw
    environment:
      LC_ALL: 'C.UTF-8'
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_HOST: postgres
      POSTGRES_DB: keycloak
      PGDATA: /var/lib/postgresql/data
    restart: unless-stopped
  keycloak:
    image: jboss/keycloak:12.0.0
    container_name: keycloak
    networks:
      - net
    ports:
      - 7070:8080
    environment:
      KEYCLOAK_USER: admin
      KEYCLOAK_PASSWORD: admin
      DB_VENDOR: POSTGRES
      DB_ADDR: postgres
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_DATABASE: keycloak
      DB_SCHEMA: public
    depends_on:
      - postgres
    restart: unless-stopped

networks:
  net:
    driver: bridge
```
