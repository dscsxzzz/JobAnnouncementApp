FROM postgres:16

ENV POSTGRES_DB=JobApp \
    POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=test

COPY Main.sql /docker-entrypoint-initdb.d/01-Main.sql

EXPOSE 5432
