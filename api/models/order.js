const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product');

const orderSchema = new Schema({
    product : { type : mongoose.Schema.Types.ObjectId, ref : 'Product', required : true},
    quantity : { type : Number, default : 1}
});


module.exports = mongoose.model('Order', orderSchema);