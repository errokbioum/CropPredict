FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ./target/CropApp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 9192
ENTRYPOINT ["java", "-jar", "/app.jar"]