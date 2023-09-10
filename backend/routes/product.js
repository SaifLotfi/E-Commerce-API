import express from 'express';
import Product from '../models/product.js';
import { getProduct,getAllProducts,createProduct, updateProduct } from '../controllers/product.js';
import { isAdmin, isAuth } from '../middleware/authentication.js';
const router = express.Router();

router.route('/').get(getAllProducts).post(isAuth,isAdmin,createProduct);

router.route('/:id').get(getProduct).put(isAuth,isAdmin,updateProduct);

export default router;