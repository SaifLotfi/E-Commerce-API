import Product from '../models/product.js';
import {
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} from '../errors/index.js';

//@desc     Fetch all Products
//route     Get /api/products
//@access   Public
const getProduct = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        return res.status(200).json(product);
    }

    throw new NotFoundError(`No Such Product with Id :${productId}`);
};

//@desc     Fetch all Products
//route     Get /api/products
//@access   Public
const getAllProducts = async (req, res, next) => {
    const products = await Product.find({});
    res.json(products);
};

export { getProduct, getAllProducts };