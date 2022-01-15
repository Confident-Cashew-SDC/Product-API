const db = require('../Database/database.js');

module.exports = {
  getAllProducts: (callback) => {
    // to do queries to product table
    // return axios request
    var sqlString = ('Select * from product limit 5');
    db.query(sqlString, callback)
  },
  getProduct: (product_id, callback) => {
    // need to join / inner join features to specific product id
    var sqlString = (`Select * from product where id = ${product_id}`);
    db.query(sqlString, callback)
  },
  getProductStyles: (product_id, callback) => {
    var sqlString = (`Select * from styles where product_id = ${product_id}`);
    db.query(sqlString, callback)
  }
}

// SELECT
//     a,
//     fruit_a,
//     b,
//     fruit_b
// FROM
//     basket_a
// INNER JOIN basket_b
//     ON fruit_a = fruit_b;