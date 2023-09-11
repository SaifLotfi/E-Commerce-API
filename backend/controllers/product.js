import Product from '../models/product.js';
import {
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} from '../errors/index.js';

const PRODUCTS_PER_PAGE = 8;

//@desc     Fetch all Products
//route     Get /api/products/:id
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
    const searchKeyword = req.query.keyword ? {name:{$regex:req.query.keyword , $options:'i'}}:{};
    const page = req.query.pageNumber||1;
    const products = await Product.find({...searchKeyword}).skip((page-1)*PRODUCTS_PER_PAGE).limit(PRODUCTS_PER_PAGE);
    const noOfPages = await Product.countDocuments({...searchKeyword});


    res.json({products,page,pages:Math.ceil(noOfPages/PRODUCTS_PER_PAGE)});
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
};
//@desc     Edit a Product
//route     PUT /api/products/:id
//@access   Private/Admin
const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;

        const updatedProduct = await product.save();
        return res.status(200).json(updatedProduct);
    }

    throw new NotFoundError(`No Such Product with Id :${productId}`);
};

//@desc     Delete a Product
//route     DELETE /api/products/:id
//@access   Private/Admin
const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        await Product.deleteOne({ _id: productId });
        return res
            .status(200)
            .json({ message: 'Product Deleted Successfully' });
    }
    throw new NotFoundError(`No Such Product with Id :${productId}`);
};

//@desc     Create a Review
//route     POST /api/products/:id/reviews
//@access   Private
const createProductReview = async (req, res, next) => {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);
    //Add review to product
    if (product) {
        
        if(product.reviews.find(r=>r.user.toString() === req.user._id.toString())){
            res.status(401).json({message:"Product Already Reviewed!"});
        }else{
            product.reviews.push({ 
                user:req.user._id,
                name:user.name, 
                rating:Number(rating),
                comment
            });
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((pV,cV)=>{
                return (cV.rating + pV)/(product.reviews.length) 
            },0);
            const updatedProduct = await product.save();
            res.status(201).json({message:"Product Reviewed Successfully!"});
        }
    } else {
        throw new NotFoundError(`No Such Product with Id :${productId}`);
    }

    await product.save();
    res.status(201).json(product);
};

//@desc     Get Top Products
//route     Get /api/products/top
//@access   Public
const getTopProducts = async (req, res, next) => {
    
    const products = await Product.find({}).sort('-rating').limit(3);
    
        return res.status(200).json(products);
    
};

export {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
};
