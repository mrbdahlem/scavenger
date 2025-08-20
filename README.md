# Scavenger

Scavenger is a Spring Boot application used to run a scavenger hunt for the Tech Club. The project pairs a Java backend with a Node/JS front end and persists data in a MariaDB database. The front end is built with Vite 7, which requires Node.js 22.12.0 or newer; the development container installs this runtime automatically.

## Build the application

The Maven wrapper downloads the required Java and Node tooling and builds both the backend and front end:

```
./mvnw clean package
```

## Build the Docker image

After packaging, extract the layered jar into `target/dependency` and build the container:

```
mkdir -p target/dependency
(cd target/dependency; jar -xf ../*.jar)
docker build -t scavenger .
```

Run the image with:

```
docker run -p 8080:8080 scavenger
```

The repository also includes a `docker-compose.yml` to run the image together with a MariaDB service.

## Development helpers

- `runserver.sh` – start the Spring Boot application for development
- `rundev.sh` – run the front-end dev server

