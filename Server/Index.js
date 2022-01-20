require('newrelic');
require('dotenv').config({path:__dirname+'../.env'})
const express = require('express');
const app = express();
const Port = process.env.PORT;

const controllers = require('../Controllers/Controllers.js');

app.use(express.json());

app.get('/products', controllers.getProducts);
app.get('/products/styles', controllers.getProductStyles);
app.get('/products/related', controllers.getRelatedProducts);


app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
