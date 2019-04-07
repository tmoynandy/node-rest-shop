const express = require('express');
const app = express();

const mongoose = require('mongoose');

//to log requests
const morgan = require('morgan');

const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('hahahah connected')
});

// to avoid CORS - Cross Origin Resource Sharing - error, we send a suitable header
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*') //* means allows access to any websites or ports
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-with, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){ /*browser sends options to server
        options as in type of request..we choose the ones we are using & append it to our header*/
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next()
});

//products
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

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