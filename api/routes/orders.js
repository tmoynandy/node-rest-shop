const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message : 'Details of all orders'
    });
});

router.get('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message : 'Order details of a single order',
        id : req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message : 'Order Deleted',
        id : req.params.orderId
    });
});

router.post('/', (req, res, next) =>{
    const newOrder = {
        id : req.body.id,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : 'New Order Posted',
        newOrder : newOrder
    })
})

module.exports = router;