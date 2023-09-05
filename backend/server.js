import express from 'express';
import 'dotenv/config.js';
const port = process.env.PORT || 5000;
const app = express();

import products from './data/products.js';

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.get('/api/products', (req, res) => {
    console.log('h')
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p._id === productId);
    res.json(product);
});

app.listen(port, () =>
    console.log(`Server is running : http://localhost:${port}`)
);
