/* There are initial commands under postgres user */
DROP DATABASE IF EXISTS buy_second;
DROP ROLE IF EXISTS buy_second;

CREATE ROLE buy_second WITH
    LOGIN
    NOSUPERUSER
    CREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '';

CREATE DATABASE buy_second
    WITH
    OWNER = buy_second
    TEMPLATE = template0
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    CONNECTION LIMIT = -1;

/* There are commands under buy_second user */
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS offers_categories;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS offer_type;

CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL CHECK (char_length(password) > 6),
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  avatar varchar(50) NOT NULL
);

CREATE UNIQUE INDEX email_index ON users ((lower(email)));
CREATE TYPE offer_type AS ENUM ('buy', 'offer');
SET datestyle = "ISO, DMY";

CREATE TABLE offers(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  sum integer NOT NULL,
  type offer_type NOT NULL,
  picture varchar(50),
  user_id integer NOT NULL,
  created_date timestamp DEFAULT current_timestamp,
  CONSTRAINT offers_users FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE INDEX title_index ON offers ((lower(title)));
CREATE INDEX offer_created_date_index ON offers (created_date);

CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(255) NOT NULL
);

CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  offer_id integer NOT NULL,
  user_id integer NOT NULL,
  text text NOT NULL,
  created_date timestamp DEFAULT current_timestamp,
  CONSTRAINT comments_users FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT comments_offers FOREIGN KEY (offer_id)
    REFERENCES offers (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE INDEX user_id_index ON comments (user_id);
CREATE INDEX offer_id_index ON comments (offer_id);
CREATE INDEX comment_created_date_index ON comments (created_date);

CREATE TABLE offers_categories(
  offer_id integer NOT NULL,
  category_id integer NOT NULL,
  CONSTRAINT offers_categories_pk PRIMARY KEY (offer_id, category_id),
  FOREIGN KEY(offer_id) REFERENCES offers (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY(category_id) REFERENCES categories (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
