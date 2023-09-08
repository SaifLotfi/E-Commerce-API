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
    res.send('add order items');

};

//@desc     Get logged in user Orders
//route     GET /api/orders/mine
//@access   Private
const getMyOrders = async (req, res, next) => {
    res.send('get my orders');
};


//@desc     Get Order by ID    
//route     GET /api/orders/:id
//@access   Private
const getOrderById = async (req, res, next) => {
    res.send('get order by id');
};

//@desc     Update Order to Paid
//route     GET /api/orders/:id/pay
//access   Private
const updateOrderToPaid = async (req, res, next) => {
    res.send('update order to paid');
};


//@desc     Update Order to Delivered
//@route    GET /api/orders/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    res.send('update order to delivered');
}

//@desc     Get all Orders
//@route    GET /api/orders
//@access   Private/Admin
const getOrders = async (req, res, next) => {
    res.send('get all orders');
}

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
}