const db = require('../Database/database.js');

module.exports = {
  getAllProducts: (callback) => {
    var sqlString = ('Select * from product limit 5');
    db.query(sqlString, callback)
  },
  getProduct: (product_id, callback) => {
    var sqlString = (`Select * from product Inner Join features ON features.product_id = product.id WHERE product.id = ${product_id}`);
    db.query(sqlString, callback)
  },
  getProductStyles: (product_id) => {
    // var sqlString = (`Select styles.id AS style_id, styles.product_id, styles.name, styles.sale_price, styles.original_price, styles.default_style, photos.thumbnail_url, photos.url, skus.id AS sku, skus.size, skus.quantity from styles
    // LEFT JOIN photos ON photos.style_id = styles.id
    // LEFT JOIN skus on skus.style_id = styles.id
    // WHERE styles.product_id = ${product_id}
    // ORDER BY styles.id`);
    var sqlString = `SELECT
    json_agg(
      json_build_object(
        'style_id', styles.id,
        'name', styles.name,
        'original_price', styles.original_price,
        'sale_price', styles.sale_price,
        'default?', styles.default_style,
        'photos', photo,
        'skus', sku
      )
    ) results
  FROM styles
  LEFT JOIN (
    SELECT
    style_id,
    json_agg(
      json_build_object(
        'thumbnail_url', photos.thumbnail_url,
        'url', photos.url
      )
    ) photo
    FROM
    photos
    GROUP BY style_id
  ) photos ON (styles.id = photos.style_id)
  LEFT JOIN (
    SELECT
    skus.style_id,
    json_object_agg(
      skus.id,
      json_build_object(
        'quantity', skus.quantity,
        'size', skus.size
      )
    ) sku
    FROM
    skus
    GROUP BY skus.style_id
  ) skus ON (styles.id = skus.style_id)
  WHERE styles.product_id = ${product_id}`
    return db.query(sqlString)
  },
  getRelatedProducts: (product_id, callback) => {
    var sqlString = (`Select related_product_id from related WHERE related.current_product_id = ${product_id}`);
    db.query(sqlString, callback)
  }
}



