const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) =>{
    // res.status(200).json({
    //     message : 'Details of all orders'
    // });
    Order.find()
    .select('quantity _id product')
    .exec()
    .then( result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.get('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    Order.findById(id)
    .select('quantity _id product')
    .exec()
    .then( result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
    // res.status(200).json({
    //     message : 'Order details of a single order',
    //     id : req.params.orderId
    // });
});

router.delete('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message : 'Order Deleted',
        id : req.params.orderId
    });
});

router.post('/', (req, res, next) =>{
    const order = new Order({
        quantity : req.body.quantity,
        product : req.body.productId
    });
    order.save()
    .then( result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
    // res.status(201).json({
    //     message : 'New Order Posted',
    //     newOrder : newOrder
    // });
});

module.exports = router;