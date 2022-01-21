COPY styles(id, product_id, name, sale_price, original_price, default_style) FROM '/Users/eric/Downloads/styles.csv' DELIMITER ',' CSV HEADER;

Copy product(id, name, slogan, description, category, default_price) FROM '/Users/eric/Downloads/product.csv' DELIMITER ',' CSV HEADER;

COPY features(id, product_id, feature, value) FROM '/Users/eric/Downloads/features.csv' DELIMITER ',' CSV HEADER;

COPY skus(id, style_id, size, quantity) FROM '/Users/eric/Downloads/skus.csv' DELIMITER ',' CSV HEADER;

COPY photos(id, style_id, url, thumbnail_url) FROM '/Users/eric/Downloads/photos.csv' DELIMITER ',' CSV HEADER;

COPY related(id, current_product_id, related_product_id) FROM '/Users/eric/Downloads/related.csv' DELIMITER ',' CSV HEADER;



