import Order from '../models/order.js';
import {
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} from '../errors/index.js';

//@desc     create new Order
//route     POST /api/orders
//@access   Private
const addOrderItems = async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return next(new BadRequestError('No order items'));
    } else {
        const order = new Order({
            orderItems: orderItems.map((oI) => ({
                ...oI,
                product: oI._id,
                _id: undefined,
            })),
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
};

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
const updateOrderToPaid = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new NotFoundError('Order not found'));
    } else {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
};

//@desc     Update Order to Delivered
//@route    PUT /api/orders/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new NotFoundError('Order not found'));
    }else{
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
