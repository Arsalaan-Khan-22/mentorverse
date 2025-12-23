# -------- BUILD STAGE --------
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# -------- RUN STAGE --------
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/Mentorverse-Backend-3.5.6.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
