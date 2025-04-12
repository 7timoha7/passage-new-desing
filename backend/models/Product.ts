import mongoose from 'mongoose';
import { IProduct } from '../types';

const Schema = mongoose.Schema;

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  priceOriginal: {
    type: Number,
    required: true,
  },
  priceSale: {
    type: Number,
    default: 0,
  },
  priceOriginalSale: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        stockID: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  article: {
    type: String,
    required: true,
  },
  goodID: {
    type: String,
    required: true,
    unique: true,
  },
  measureCode: {
    type: String,
  },
  measureName: {
    type: String,
  },
  ownerID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  size: {
    type: String,
  },
  thickness: {
    type: String,
  },
  originCountry: {
    type: String,
  },
  type: {
    type: String,
    default: '',
  },
  characteristics: {
    type: [
      {
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
