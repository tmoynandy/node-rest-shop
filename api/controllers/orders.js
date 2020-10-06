
const { CreateOrder, GetOrders, GetOrderById, DeleteOrder } = require('../services/orders');

exports.orders_get_all = async (req, res, next) => {
    try {
        const response = await GetOrders()
        res.json(response)
    } catch (err) {
        next(err)
    }
}



exports.orders_create_order = async (req, res, next) => {
    let payload = {
        quantity: req.body.quantity,
        productId: req.body.productId
    }
    try {
        let response = await CreateOrder(payload)
        res.json(response)
    } catch (err) {
        next(err)
    }
}


exports.orders_get_one = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const response = await GetOrderById(orderId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

exports.orders_delete_order = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const response = await DeleteOrder(orderId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}