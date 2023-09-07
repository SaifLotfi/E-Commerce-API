import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    logoutUser,
} from '../controllers/user.js';
import {isAdmin,isAuth} from '../middleware/authentication.js'

const router = express.Router();

router.route('/').post(registerUser).get(isAuth,isAdmin,getUsers);
router.post('/login', authUser);
router.post('/logout',isAuth, logoutUser);
router.route('/profile').all(isAuth).get(getUserProfile).put(updateUserProfile);
router.route('/:id').all(isAuth,isAdmin).delete(deleteUser).get(getUserById).put(updateUser);

export default router;
