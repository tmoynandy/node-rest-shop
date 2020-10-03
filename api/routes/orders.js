const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');

//controller routes
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.get('/:orderId', checkAuth, OrdersController.orders_get_one);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

router.post('/', checkAuth, OrdersController.orders_create_order );

module.exports = router;