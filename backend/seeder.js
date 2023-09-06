import mongoose from "mongoose";
import 'dotenv/config.js';
import colors from 'colors';
import products from "./data/products.js";
import users from "./data/users.js";
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';
import connectDB from './config/db.js';

connectDB();

const importData = async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers =await User.insertMany(users);
        const adminUserId = createdUsers[0]._id;

        const sampleProducts = products.map(p=>{
            return {...p,user:adminUserId};
        });
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    }catch(err){
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        

        console.log('Data Destroyed!'.green.inverse);
        process.exit();
    }catch(err){
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
}

process.argv[2]==='-d'?destroyData():importData();