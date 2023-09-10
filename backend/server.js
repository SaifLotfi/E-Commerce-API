import path from 'path';
import express from 'express';
import 'dotenv/config.js';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
const app = express();

import connectDB from './config/db.js';
import productRouter from './routes/product.js';
import notFoundMiddleware from './middleware/not-found.js';
import globalErrorHandlerMiddleware from './middleware/error-handler.js';
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import uploadRouter from './routes/upload.js';

const __dirname = path.resolve();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send({clientId:process.env.PAYPAL_CLIENT_ID});
});
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(notFoundMiddleware);
app.use(globalErrorHandlerMiddleware);



app.use((err,req,res,next)=>{
    console.log(err.msg);
    res.status(500).send({msg:err.message})
})
app.listen(port, () =>
    console.log(`Server is running : http://localhost:${port}`)
);
