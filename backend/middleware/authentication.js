import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';
import User from '../models/user.js';

const isAuth = async (req, res, next) => {
    const authToken = req.cookies.jwt;
    if (!authToken) {
        throw new UnauthenticatedError('No Token Provided!');
    }
    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET); //should we add try catch ?
        req.user = await User.findById(decodedToken._id).select('-password');
    } catch (err) {
        console.log(err);
        throw new UnauthenticatedError('Invalid Token!');
    }

    next();
};

const isAdmin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        throw new UnauthenticatedError('Not Authorized as Admin!');
    }
};
export { isAuth, isAdmin };
