const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) =>{
    //for fetching all stored data
    // res.status(200).json({
    //     message : 'Handling GET request to /products'
    // });
    Product.find().exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    // //for static single data viewing for test
    // if (id === 'special'){
    //     res.status(200).json({
    //         message : 'special ID',
    //         id : id
    //     });
    // }
    // else {
    //     res.status(200).json({
    //         message : 'not special'
    //     });
    // }
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        if (doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message : 'No valid entry found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
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
   
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message : 'product added',
            createdProduct : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    });
});

module.exports = router;