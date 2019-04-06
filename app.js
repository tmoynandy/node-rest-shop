const express = require('express');
const app = express();

//to log requests
const morgan = require('morgan');

const bodyParser = require('body-parser');


//products
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

//makes url encoded data and json data easily readable
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders',orderRoutes);

//if we make past the above two requests/middlewares, it's an error
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
//catches the error directed by next to this middleware
app.use((error, req, res, next) =>{
    res.status(error.status || 500).json({
        error : {
            message : error.message
        }
    });
});

app.use((req, res, next) => {
    res.status(200).json({
        message : 'it works'
    });
});

module.exports = app;