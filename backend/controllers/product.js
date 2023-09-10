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

//@desc     Create a Product
//route     POST /api/products
//@access   Private/Admin
const createProduct = async (req, res, next) => {
    //create sample product
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
    });
    await product.save();
    res.status(201).json(product);
}

export { getProduct, getAllProducts,createProduct };
