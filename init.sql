-- init.sql

DROP DATABASE IF EXISTS feirahelio WITH (FORCE);

CREATE DATABASE feirahelio
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

\c feirahelio

CREATE TABLE user_table (
	user_id SERIAL PRIMARY KEY,
	user_name VARCHAR(15),
	user_email VARCHAR(30)
);

CREATE TABLE image_table (
	image_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES user_table,
	image_data BYTEA
);

CREATE TABLE adm_table (
	adm_id SERIAL PRIMARY KEY,
	adm_name VARCHAR(15),
	adm_cod CHAR(10),
	adm_key CHAR(7)
);

SELECT * FROM user_table;