import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} from '../errors/index.js';
import generateToken from '../utils/generateToken.js';
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password.toString()))) {
        throw new UnauthenticatedError(`Invalid Email Or Password!`);
    }

    generateToken(res, newUser._id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
};

// @desc    delete token
// @route   POST /api/users/logout
// @access  Private
const logoutUser = async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send({ message: 'logged Out Successfully!' });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError('User already exists');
    }
    const newUser = await User.create({
        name,
        email,
        password,
    });

    if (!newUser) {
        throw new BadRequestError('Failed to create user');
    }

    generateToken(res, newUser._id);

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
    });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    res.send('get user profile');
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    res.send('update user profile');
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    res.send('get users');
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    res.send('delete user');
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    res.send('get user by id');
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    res.send('update user');
};

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
