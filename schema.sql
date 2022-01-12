DROP DATABASE productapi;

Create database productapi;

\c productapi

CREATE TABLE Product (
 id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
 name VARCHAR(25) NOT NULL,
 slogan TEXT,
 description TEXT,
 category VARCHAR(25) NOT NULL,
 default_price INTEGER NOT NULL
);


CREATE TABLE Features (
 id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
 product_id INTEGER UNIQUE NOT NULL,
 feature VARCHAR(25) NOT NULL,
 value VARCHAR(25) NOT NULL
);


CREATE TABLE styles (
 id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
 productId INTEGER NOT NULL UNIQUE,
 name VARCHAR(35) NOT NULL,
 original_price INTEGER NOT NULL Check (original_price > 0),
 sale_price INTEGER CHECK (sale_price = null OR sale_price <= original_price),
 default_style INTEGER NOT NULL
);



CREATE TABLE Skus (
 id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
 styleId INTEGER NOT NULL UNIQUE,
 quantity INTEGER NOT NULL,
 size VARCHAR(5) NOT NULL
);



CREATE TABLE Photos (
 id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
 styleId INTEGER UNIQUE,
 url TEXT NOT NULL,
 thumbnail_url TEXT NOT NULL
);



CREATE TABLE Related (
 id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
 current_product_id INTEGER NOT NULL UNIQUE,
 related_product_id INTEGER NOT NULL
);


ALTER TABLE styles ADD CONSTRAINT styles_productId_fkey FOREIGN KEY (productId) REFERENCES Product(id);
ALTER TABLE Skus ADD CONSTRAINT Skus_styleId_fkey FOREIGN KEY (styleId) REFERENCES styles(id);
ALTER TABLE Photos ADD CONSTRAINT Photos_styleId_fkey FOREIGN KEY (styleId) REFERENCES styles(id);
ALTER TABLE Features ADD CONSTRAINT Features_product_id_fkey FOREIGN KEY (product_id) REFERENCES Product(id);
ALTER TABLE Related ADD CONSTRAINT Related_current_product_id_fkey FOREIGN KEY (current_product_id) REFERENCES Product(id);