const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


exports.products_get_all = (req, res, next) =>{
    //for fetching all stored data
    // res.status(200).json({
    //     message : 'Handling GET request to /products'
    // });
    
    Product.find()
    .select('productImage' )
    .exec()
    .then(docs =>{
        console.log(docs);
        const response = {
            count : docs.length,
            products : docs.map( doc => {
                return {
                    name : doc.name,
                    price : doc.price,
                    _id :doc._id,
                    productImage : doc.productImage,
                    request : {
                        type : 'GET',
                        description : 'REQUEST_TO_FETCH_THIS_PRODUCT',
                        url :'http://localhost:3000/products/'+doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

}

exports.products_get_one = (req, res, next) =>{
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
    .select('name price _id productImage')
    .exec()
    .then(doc =>{
        console.log(doc);
        if (doc){
            const result = {
                name : doc.name,
                price : doc.price,
                _id : doc._id,
                productImage : doc.productImage,
                request : {
                    type : 'GET',
                    description : 'VIEW_ALL_PRODUCTS',
                    url : 'http://localhost:3000/products'
                }
            }
            res.status(200).json(result);
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
}


exports.products_patch = (req, res, next) =>{
    const id = req.params.productId;
    // res.status(200).json({
    //     message : 'Updated new product',
    //     id : id
    // });
    const updateOps = {};
    for ( const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id: id}, { $set :updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : 'Product has been updated',
            request : {
                type : 'GET',
                description : 'fetch-UPDATED-PRODUCT',
                url : 'http://localhost:3000/products/'+id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}


exports.products_delete = (req, res, next) =>{
    const id = req.params.productId;
    // res.status(200).json({
    //     message : 'deleted product',
    //     id : id
    // });
    Product.remove({
        _id : id
    })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json({
            message : "Product Deleted",
            request : {
                type : 'POST',
                description : 'ADD_NEW PRODUCT',
                url : 'http://localhost:3000/products',
                body : {
                    name : 'String',
                    price : 'Number'
                }
            }
        });
    })
    .catch( err => {
        console.log(result);
        res.status(500).json({
            error : err
        });
    });

}


exports.products_create_product = (req, res, next) =>{
    console.log(req.file);
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage : req.file.path
    });
    product.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message : 'product added',
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                //productImage : result.productImage,
                request : {
                    type : 'GET',
                    description : 'TO_FETCH_THIS_PRODUCT',
                    url : 'http://localhost:3000/products/'+result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    });
}