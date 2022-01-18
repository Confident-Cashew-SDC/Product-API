require('newrelic');
const express = require('express');
const app = express();
const Port = 3000;



const controllers = require('../Controllers/Controllers.js');


app.use(express.json());


app.get('/products', controllers.getProducts);
app.get('/products/styles', controllers.getProductStyles);
app.get('/products/related', controllers.getRelatedProducts);

//Tests
app.get('/products/test', (req, res, next) => {
  req.query.product_id = Math.floor(Math.random()*(200000) + 1);
  next()
}, controllers.getProducts
);
// app.route('/reviews/product/test')
// .get((req, res, next) => {
//   req.query.product_id = Math.floor(Math.random()*(200000) + 1);
//   next()
// }, controller.reviews.get
// );

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
