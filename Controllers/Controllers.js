const axios = require('axios');
const models = require('../Models/Models.js');

module.exports = {
  getProducts: (req, res) => {
    if (req.query.product_id === undefined) {
      models.getAllProducts((err, results) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(results.rows)
        }
      })
    } else {
      models.getProduct(req.query.product_id, (err, results) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(results.rows[0])
        }
      })
    }
  },
  getProductStyles: (req, res) => {
    models.getProductStyles(req.query.product_id, (err, results) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.send(results.rows)
      }
    })
  }
}

