import express from 'express';
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
} from '../controllers/order.js';
import {isAdmin,isAuth} from '../middleware/authentication.js'

const router = express.Router();

router.route('/').all(isAuth).post(addOrderItems).get(isAdmin,getOrders);
router.route('/mine').all(isAuth).get(getMyOrders);
router.route('/:id').all(isAuth).get(getOrderById);
router.route('/:id/paid').all(isAuth).put(updateOrderToPaid);
router.route('/:id/delivered').all(isAuth,isAdmin).put(updateOrderToDelivered);

export default router;