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
  getProductStyles: (product_id, callback) => {
    console.log(product_id)
    var sqlString = (`Select styles.id AS style_id, styles.product_id, styles.name, styles.sale_price, styles.original_price, styles.default_style, photos.thumbnail_url, photos.url, skus.id AS sku, skus.size, skus.quantity from styles
    LEFT JOIN photos ON photos.style_id = styles.id
    LEFT JOIN skus on skus.style_id = styles.id
    WHERE styles.product_id = ${product_id}
    ORDER BY styles.id`);
    db.query(sqlString, callback)
  }
}



