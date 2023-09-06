import express from 'express';
import Product from '../models/product.js';
const router = express.Router();

router.get('/', async(req, res) => {
    const products = await Product.find({});
    res.json(products);
});

router.get('/:id', async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){

        return res.status(200).json(product);
    }
    res.status(404).json({message : 'Product not found!'});
});

export default router;