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
          const features = [];
          results.rows.forEach((product) => {
            features.push({feature: product.feature, value: product.value});
          })
          const final = results.rows[0];
          delete final.feature;
          delete final.value;
          final.features = features;
          res.send(final)
        }
      })
    }
  },
  getProductStyles: (req, res) => {
    models.getProductStyles(req.query.product_id, (err, response) => {
      if (err) {
        res.status(404).send(err)
      } else {
        const final = {product_id: req.query.product_id, results: []};
        for (var i = 0; i < response.rows.length; i++) {
          if (final.results.length === 0 || final.results[final.results.length - 1].style_id !== response.rows[i].style_id) {
            final.results.push({
              style_id: response.rows[i].style_id,
              name: response.rows[i].name,
              original_price: response.rows[i].original_price,
              sale_price: response.rows[i].sale_price,
              "default?": response.rows[i].default_style,
              photos: [{thumbnail_url: response.rows[i].thumbnail_url, url: response.rows[i].url}],
              skus: {}
            })
            final.results[final.results.length - 1].skus[`${response.rows[i].sku}`] = { quantity: response.rows[i].quantity, size: response.rows[i].size};
          } else {
            if (final.results[final.results.length - 1].photos[final.results[final.results.length - 1].photos.length - 1].url !== response.rows[i].url) {
              final.results[final.results.length - 1].photos.push({
                thumbnail_url: response.rows[i].thumbnail_url,
                url: response.rows[i].url
              })
            }
            final.results[final.results.length - 1].skus[`${response.rows[i].sku}`] = { size: response.rows[i].size, quantity: response.rows[i].quantity};
          }
        }
        res.send(final)
      }
    })
  },
  getRelatedProducts: (req, res) => {
    models.getRelatedProducts(req.query.product_id, (err, response) => {
      if (err) {
        res.status(404).send(err)
      } else {
        const final = [];
        response.rows.forEach((id) => {
          final.push(id.related_product_id)
        })
        res.send(final)
      }
    })
  }
}

