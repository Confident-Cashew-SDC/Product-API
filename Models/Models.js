const db = require('../Database/database.js');

module.exports = {
  getAllProducts: (callback) => {
    // to do queries to product table
    // return axios request
    var sqlString = ('Select * from product limit 10');
    db.query(sqlString, callback)
  }
}