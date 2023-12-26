import express from 'express'
import mongoose from 'mongoose';
import { PORT, MONGOOSE_URI } from './config.js'
import cors from 'cors'

import storeRoute from './router/store.js'
import productRoute from './router/product.js'
import purchaseRoute from './router/purchase.js'
import salesRoute from './router/sales.js'
import usersRoute from './router/user.js'
import customerRoute from './router/customer.js'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// Users API
app.use('/api', usersRoute)

app.use('/api/customer', customerRoute)

// Bump Server
app.get('/ping', (req, res) => {
    res.json({
        'connected': true
    })
})

mongoose
    .connect(MONGOOSE_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
