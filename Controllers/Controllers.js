const axios = require('axios');
const models = require('../Models/Models.js');

module.exports = {
  getProducts: (req, res) => {
    let page = !isNaN(req.query.page) ? req.query.page : 1;
    let count = !isNaN(req.query.count) ? req.query.count : 5;
    if (page > 0 && count > 0 && req.query.product_id === undefined) {
      models.getAllProducts(page, count)
        .then((response) => {
          res.send(response.rows);
        })
        .catch((error) => {
          res.status(400).send(error);
        })
    } else {
      models.getProduct(req.query.product_id)
      .then((response) => {
          res.send(response.rows[0].final)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
    }
  },
  getProductStyles: (req, res) => {
    models.getProductStyles(req.query.product_id)
    .then((response) => {
      const results = {
        product_id: req.query.product_id,
        results: response.rows[0].results
      }
      res.send(results)
    })
    .catch((err) => {
      res.send(err)
    })
  },
  getRelatedProducts: (req, res) => {
    models.getRelatedProducts(req.query.product_id)
    .then((response) => {
      res.send(response.rows[0].json_agg)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }
}

