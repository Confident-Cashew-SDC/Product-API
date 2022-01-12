const { Schema } = require('mongoose');

const productSchema = new Schema({
  _id: {type: Number, unique: true},
  name: {type: String, unique true},
  slogan: String,
  description: String,
  feature: [{ feature: String, value: String }],
  related: [Number],
  category: String,
  default_price: String,
  styles: [Number]
});

const styleSchema = new Schema({
  _id: {type: Number, unique: true},
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  photos: [{ url: String, thumbnail_url: String }],
  skus: [Number]
});

const skuSchema = new Schema({
  _id: {type: Number, unique: true},
  quantity: Number,
  size: String,
  style_id: {
    type: Schema.Types.ObjectId,
    ref: 'Style'
  }
});