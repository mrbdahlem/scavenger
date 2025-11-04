FROM eclipse-temurin:21-alpine

# build argument pointing to the prepared dependency layout produced by the maven build
ARG DEPENDENCY=target/dependency

# create a non-root user early so files can be owned correctly later
RUN addgroup -S scavenger && adduser -S scavenger -G scavenger

# create app directories (ensure they exist before COPY)
RUN mkdir -p /app /app/lib

# copy the prepared dependency layout into the image
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app

# set ownership so the non-root user can run the app
RUN chown -R scavenger:scavenger /app

# switch to the non-root user
USER scavenger:scavenger

ENTRYPOINT ["java","-cp","app:app/lib/*","run.mycode.scavenger.ScavengerApplication"]
