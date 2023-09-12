import Order from '../models/order.js';
import {
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} from '../errors/index.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

//@desc     create new Order
//route     POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // get the ordered items from our database
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });

        // map over the order items and use the price from our items from database
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
            );
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        // calculate prices
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
            calcPrices(dbOrderItems);

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

//@desc     Get logged in user Orders
//route     GET /api/orders/mine
//@access   Private
const getMyOrders = async (req, res, next) => {
    //add the logic of this function
    const orders = await Order.find({ user: req.user._id });
    res.status(200).send(orders);
};
//@desc     Get Order by ID
//route     GET /api/orders/:id
//@access   Private
const getOrderById = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );
    if (!order) {
        return next(new NotFoundError('Order not found'));
    } else {
        res.status(200).send(order);
    }
};

//@desc     Update Order to Paid
//route     PUT /api/orders/:id/pay
//access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error('Payment not verified');

    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error('Transaction has been used before');

    const order = await Order.findById(req.params.id);

    if (order) {
        // check the correct amount was paid
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc     Update Order to Delivered
//@route    PUT /api/orders/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new NotFoundError('Order not found'));
    } else {
        order.isDelevrder = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
};

//@desc     Get all Orders
//@route    GET /api/orders
//@access   Private/Admin
const getOrders = async (req, res, next) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
};
export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
};
