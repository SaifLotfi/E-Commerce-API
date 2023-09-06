import express from 'express';
import Product from '../models/product.js';
import { getProduct,getAllProducts } from '../controllers/product.js';
const router = express.Router();

router.route('/').get(getAllProducts);

router.route('/:id').get(getProduct);

export default router;