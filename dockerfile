FROM eclipse-temurin:17-alpine
RUN addgroup -S scavenger && adduser -S scavenger -G scavenger
USER scavenger:scavenger
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","run.mycode.scavenger.ScavengerApplication"]
