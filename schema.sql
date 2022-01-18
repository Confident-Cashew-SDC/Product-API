DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  slogan TEXT,
  description TEXT,
  category VARCHAR(25) NOT NULL,
  default_price INTEGER NOT NULL
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  sale_price TEXT,
  original_price INTEGER NOT NULL CHECK (original_price >= 0),
  default_style BOOLEAN NOT NULL,
  FOREIGN KEY(product_id)
  REFERENCES product(id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER NOT NULL,
  url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY(style_id)
  REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(style_id)
  REFERENCES styles(id)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value TEXT,
  FOREIGN KEY(product_id)
  REFERENCES product(id)
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  current_product_id INTEGER NOT NULL,
  FOREIGN KEY(current_product_id)
  REFERENCES product(id),
  related_product_id INTEGER NOT NULL
);

Create index on styles (product_id);
Create index on skus (style_id);
Create index on photos (style_id);
create index on related (current_product_id);
Create index on related (related_product_id);
Create index on features (product_id);
