import express from 'express';
import Product from '../models/product.js';
import {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from '../controllers/product.js';
import { isAdmin, isAuth } from '../middleware/authentication.js';
const router = express.Router();

router.route('/').get(getAllProducts).post(isAuth, isAdmin, createProduct);

router.route('/top').get(getTopProducts)

router
    .route('/:id')
    .get(getProduct)
    .put(isAuth, isAdmin, updateProduct)
    .delete(isAuth, isAdmin, deleteProduct);

router.route('/:id/review',isAuth,createProductReview);


export default router;
