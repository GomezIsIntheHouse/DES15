const express = require('express')
const _ = require('lodash')
const logger = require('morgan')
require('dotenv').config(); 
const errorHandler = require('./src/middlewares/errorHandler')
const indexRouter = require('./src/routes/index')

const { httpServer, app } = require("./src/config/http");
const {SocketConfig} = require("./src/config/socketio");
const messageSocket = require("./src/sockets/chat.events");


const socketConfig = new SocketConfig();
socketConfig.use(messageSocket);

// app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(logger('dev'))

app.use(express.static(__dirname + "/public"));

app.use('/api', indexRouter)

app.use(errorHandler);

module.exports = httpServer;
