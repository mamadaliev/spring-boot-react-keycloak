# keycloak-spring-boot-demo

### Stack
- Open JDK 11
- Maven 3.6.3
- Spring Boot 2.4.0
- Keycloak 12.0
- Postgres 11.0

Also:
- **Docker Desktop** &mdash; for building images and running containers

## Keycloak installation
To install the Keycloak as a service with docker, execute the following command in your terminal:
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

> If the port 7070 already in use, then need to find the process id and kill it.

To set free the port on Windows, use following command.
```
> netstat -aon | findstr 7070
  TCP    0.0.0.0:7070           0.0.0.0:0              LISTENING       1268
  TCP    127.0.0.1:7070         127.0.0.1:49920        FIN_WAIT_2      1268
  TCP    127.0.0.1:7070         127.0.0.1:49925        FIN_WAIT_2      1268
  TCP    127.0.0.1:49920        127.0.0.1:7070         CLOSE_WAIT      12776
  TCP    127.0.0.1:49925        127.0.0.1:7070         CLOSE_WAIT      12776
  TCP    [::]:7070              [::]:0                 LISTENING       1268
  TCP    [::1]:7070             [::]:0                 LISTENING       10188
  
> taskkill /f /pid 1268
SUCCESS: The process with PID 1268 has been terminated.

> taskkill /f /pid 10188
SUCCESS: The process with PID 10188 has been terminated.
```

To set free the port on \*nix system, use following command.
```
lsof -i tcp:7070
kill -9 <PID>
```

## Keycloak configuration
Open the [localhost:7070/auth](http://localhost:7070/auth) on browser and click the Administration console link.

![](https://i.ibb.co/sVxX3Hw/image.png)

Authenticate in this page with following credentionals.
```
Username: admin
Password: admin
```
![](https://i.ibb.co/cgSW1Rs/image.png)

## Add a new REALM
Realm is the same as a tenant.
![](https://i.ibb.co/Mn12Jm4/image.png)

Create a new realm by the name `dev`.
![](https://i.ibb.co/t29xsSQ/image.png)

## Add a new client
Add a new client by the name `book`.
![](https://i.ibb.co/kczrbMX/image.png)

## Add a new Client Roles
![](https://i.ibb.co/8XPgp6m/image.png)

Add two roles:
- USER
- ADMIN

![](https://i.ibb.co/LCWnrhN/image.png)

![](https://i.ibb.co/9rP7mQ9/image.png)

## Add new users

Add a new user by the nickname `user1`.
![](https://i.ibb.co/XbkMZk0/image.png)

Configurate the credentionals of the `user1`.
![](https://i.ibb.co/4ThN9NZ/image.png)

Configurate the roles of the `user1`.
![](https://i.ibb.co/TBpH1xd/image.png)

That's all. But, also you can create other users, for example `user2` with role `ADMIN` and `user3` with role `USER, ADMIN`.

## Get access token
![](https://i.ibb.co/RCRPVgY/image.png)

## Testing endpoint
`{{access_token}}` is your access token.
![](https://i.ibb.co/n6zBtGx/image.png)


Thanks for attention.
