const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message : 'Handling GET request to /products'
    });
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message : 'special ID',
            id : id
        });
    }
    else {
        res.status(200).json({
            message : 'not special'
        });
    }
});

router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message : 'Updated new product',
        id : id
    });
});

router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message : 'deleted product',
        id : id
    });
});

router.post('/', (req, res, next) =>{
    const newProduct = {
        name : req.body.name,
        price : req.body.price
    };
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result =>{
        console.log(result);

    })
    .catch(err => console.log(err));
    res.status(201).json({
        message : 'Handling POST request to /products',
        newProduct : newProduct
    });
});

module.exports = router;