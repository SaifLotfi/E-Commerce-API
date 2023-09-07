import express from 'express';
import 'dotenv/config.js';
import 'express-async-errors';
const port = process.env.PORT || 5000;
const app = express();

import connectDB from './config/db.js';
import productRouter from './routes/product.js';
import notFoundMiddleware from './middleware/not-found.js';
import globalErrorHandlerMiddleware from './middleware/error-handler.js';
import userRouter from './routes/user.js';
connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use(notFoundMiddleware);
app.use(globalErrorHandlerMiddleware);

app.listen(port, () =>
    console.log(`Server is running : http://localhost:${port}`)
);
