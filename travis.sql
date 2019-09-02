CREATE DATABASE ticket;
\c ticket

CREATE TABLE tickets (id bigserial primary key, title VARCHAR (50), description VARCHAR (355));

INSERT INTO tickets(title,description) VALUES ('test','test description');