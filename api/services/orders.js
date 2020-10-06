const Boom = require("@hapi/boom")
const orderRepo = require("../models/order")
const { createOrderValidator, IdValidator } = require("../validators/order-validator")

exports.CreateOrder = (payload) => {
    return new Promise(async (resolve, reject) => {
        let { error } = await createOrderValidator.validate(payload)
        if (!error) {
            try {
                const { _doc } = await new orderRepo({
                    quantity: payload.quantity,
                    product: payload.productId
                }).save()
                resolve({
                    message: 'order added',
                    createdOrder: {
                        id: _doc._id,
                        productId: _doc.product,
                        quantity: _doc.quantity
                    },
                    request: {
                        type: 'GET',
                        description: 'FETCH_THIS_ORDER',
                        url: 'http://localhost:3000/orders/' + _doc._id
                    }
                })
            } catch (err) {
                reject(Boom.badImplementation(err.message).output)
            }
        } else {
            reject(Boom.badRequest(error.message).output)
        }
    })
}

exports.GetOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let docs = await orderRepo.find()
                .select('quantity _id product')
                .populate('product', 'name price _id productImage')
                .exec();
            resolve({
                count: docs.length,
                orders: docs.map(result => {
                    return {
                        quantity: result.quantity,
                        orderId: result._id,
                        productDetails: result.product,
                        request: {
                            type: 'GET',
                            description: 'FETCH-INDIVIDUAL-ORDER',
                            url: 'http://localhost:3000/orders/' + result._id
                        }
                    }
                })
            })
        } catch (err) {
            reject(Boom.badImplementation(err.message).output)
        }
    })
}
exports.GetOrderById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { error } = await IdValidator.validate(id)
            if (!error) {
                let doc = await orderRepo.findById(id)
                    .select('quantity _id product')
                    .populate('product', 'name price _id productImage')
                    .exec()
                resolve({
                    OrderId: doc._id,
                    quantity: doc.quantity,
                    ProductDetails: doc.product,
                    request: {
                        type: 'GET',
                        description: 'VIEW_ALL_PRODUCTS',
                        url: 'https://localhost:3000/orders'
                    }
                })
            } else {
                reject(Boom.badRequest(error.message).output)
            }
        } catch (err) {
            console.log(err)
            reject(Boom.badImplementation(err.message).output)
        }
    })
}

exports.DeleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        let { error } = await IdValidator.validate(id)
        if (!error) {
            try {
                await orderRepo.deleteOne({
                    _id: id
                })
                resolve({
                    message: 'order removed',
                    request: {
                        type: 'POST',
                        description: 'ADD_NEW_PRODUCT',
                        url: 'http://localhost:3000/orders',
                        body: {
                            quantity: 'Number',
                            productId: 'Id_of_product'
                        }
                    }
                })
            } catch (err) {

                reject(Boom.notFound(e.message).output)
            }
        }
        else {
            reject(Boom.badRequest(error.message).output)
        }
    })
}