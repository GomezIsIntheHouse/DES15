const express = require('express');
const getEnv = require('../services/enviroment/env.service');
const messageRouterEvents = require('../sockets/chat.events');

const productsRoutes = require('./products/products.routes')
const messageRoutes = require('./messages/messages.routes')

const router =  express.Router();



router.get('/health', async(req, res)=>{

    res.status(200).json({
        success: true,
        server:'Up!',
        enviroment: getEnv()
    })
})
.use('/products', productsRoutes)
.use('/messages', messageRoutes)
module.exports = router;