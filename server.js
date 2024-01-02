import express from 'express'
import mongoose from 'mongoose';
import { PORT, MONGOOSE_URI, CLIENT } from './config.js'
import cors from 'cors'

import storeRoute from './router/store.js'
import productRoute from './router/product.js'
import usersRoute from './router/user.js'
import customerRoute from './router/customer.js'
import orderRoute from './router/order.js'
import salesRoute from './router/sales.js'
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const socketIO = new Server(httpServer, {
    cors: {
        origin: CLIENT
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

app.use("/api/store", storeRoute);
app.use("/api/product", productRoute);
app.use('/api', usersRoute)
app.use('/api/customer', customerRoute)
app.use('/api/order', orderRoute)
app.use('/api/sales', salesRoute)

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        socket.disconnect()
    });
});

httpServer.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

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
    })
    .catch((error) => {
        console.log(error);
    });

export { socketIO }