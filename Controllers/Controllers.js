const axios = require('axios');
const models = require('../Models/Models.js');

module.exports = {
  getAllProducts: (req, res) => {
    if (req.query.product_id === undefined) {
      models.getAllProducts((err, results) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(results.rows)
        }
      })
    }
  }
}