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
    .populate('product','name price _id productImage')
    .exec()
    .then( results =>{
        console.log(results);
        // res.status(200).json(result); some change
        const response = {
            count : results.length,
            orders : results.map(result =>{
                return{
                    quantity : result.quantity,
                    orderId : result._id,
                    productDetails : result.product,
                    request : {
                        type : 'GET',
                        description : 'FETCH-INDIVIDUAL-ORDER',
                        url : 'http://localhost:3000/orders/'+result._id
                    }
                }
            })
        };
        res.status(200).json(response);
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
    .populate('product','name price _id productImage')
    .exec()
    .then( result =>{
        console.log(result);
        res.status(200).json({
            OrderId : result._id,
            quantity : result.quantity,
            ProductDetails : result.product,
            request : {
                type : 'GET',
                description : 'VIEW_ALL_PRODUCTS',
                url : 'https://localhost:3000/orders'
            }
        });
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
    const id = req.params.orderId;
    // res.status(200).json({
    //     message : 'Order Deleted',
    //     id : req.params.orderId
    // });
    Order.remove({
        _id : id
    })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json({
            message : 'order removed',
            request : {
                type : 'POST',
                description : 'ADD_NEW_PRODUCT',
                url : 'http://localhost:3000/orders',
                body : {
                    quantity : 'Number',
                    productId : 'Id_of_product'
                }
            }
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
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
        res.status(201).json({
            message : 'order added',
            createdOrder : {
                id : result._id,
                productId :result.product,
                quantity : result.quantity
            },
            request : {
                type : 'GET',
                description : 'FETCH_THIS_ORDER',
                url : 'http://localhost:3000/orders/'+result._id
            }
            
        });
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