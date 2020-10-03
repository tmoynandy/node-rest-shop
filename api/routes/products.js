const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, './uploads');
    },
    filename : function (req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});
const fileFilter = (req, file, cb) =>{
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const upload = multer({
    storage : storage, 
    limits : {
    fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});

const Product = require('../models/product');

router.get('/', ProductsController.products_get_all);

router.get('/:productId', ProductsController.products_get_one);

//updating entry
//pass array of json to update
//[{"propName":"name","value":"changed Name"}]
router.patch('/:productId',checkAuth, ProductsController.products_patch);

router.delete('/:productId', checkAuth, ProductsController.products_delete);

router.post('/', upload.single('productImage'), checkAuth, ProductsController.products_create_product);

module.exports = router;
//aa