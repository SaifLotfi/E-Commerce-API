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
//@desc     Edit a Product
//route     PUT /api/products/:id
//@access   Private/Admin
const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name||product.name;
        product.price = req.body.price||product.price;
        product.image = req.body.image||product.image;
        product.brand = req.body.brand||product.brand;
        product.category = req.body.category||product.category;
        product.countInStock = req.body.countInStock||product.countInStock;
        product.description = req.body.description||product.description;

        const updatedProduct = await product.save();
        return res.status(200).json(updatedProduct);
    }

    throw new NotFoundError(`No Such Product with Id :${productId}`);
};

export { getProduct, getAllProducts,createProduct ,updateProduct};
