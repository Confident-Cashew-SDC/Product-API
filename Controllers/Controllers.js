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
          const features = [];
          response.rows.forEach((product) => {
            features.push({feature: product.feature, value: product.value});
          })
          const final = response.rows[0];
          delete final.feature;
          delete final.value;
          final.features = features;
          res.send(final)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
    }
  },
  getProductStyles: (req, res) => {
    // models.getProductStyles(req.query.product_id, (err, response) => {
    //   if (err) {
    //     res.status(404).send(err)
    //   } else {
        // const final = {product_id: req.query.product_id, results: []};
        // for (var i = 0; i < response.rows.length; i++) {
        //   if (final.results.length === 0 || final.results[final.results.length - 1].style_id !== response.rows[i].style_id) {
        //     final.results.push({
        //       style_id: response.rows[i].style_id,
        //       name: response.rows[i].name,
        //       original_price: response.rows[i].original_price,
        //       sale_price: response.rows[i].sale_price,
        //       "default?": response.rows[i].default_style,
        //       photos: [{thumbnail_url: response.rows[i].thumbnail_url, url: response.rows[i].url}],
        //       skus: {}
        //     })
        //     final.results[final.results.length - 1].skus[`${response.rows[i].sku}`] = { quantity: response.rows[i].quantity, size: response.rows[i].size};
        //   } else {
        //     if (final.results[final.results.length - 1].photos[final.results[final.results.length - 1].photos.length - 1].url !== response.rows[i].url) {
        //       final.results[final.results.length - 1].photos.push({
        //         thumbnail_url: response.rows[i].thumbnail_url,
        //         url: response.rows[i].url
        //       })
        //     }
        //     final.results[final.results.length - 1].skus[`${response.rows[i].sku}`] = { size: response.rows[i].size, quantity: response.rows[i].quantity};
        //   }
        // }
        // res.send(final)
      //}
    //})
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

