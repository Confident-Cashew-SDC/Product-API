const express = require('express');
const app = express();
const Port = 3000;

const controllers = require('../Controllers/Controllers.js');


app.use(express.json());

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});


app.get('/products', controllers.getAllProducts);
