# DB Test
CREATE TABLE tickets(
   id serial PRIMARY KEY,
   title VARCHAR (50) NOT NULL,
   description VARCHAR (355) NOT NULL,
);

INSERT INTO tickets(title,description) VALUES ('test','test description');