const Boom = require("@hapi/boom")
const { createProductValidate, IdValidator } = require("../validators/product-validators")
const productRepo = require("../models/product")

exports.CreateProduct = (payload) => {
    return new Promise(async (resolve, reject) => {
        let { error } = await createProductValidate.validate(payload)
        if (!error) {
            try {
                const { _doc } = await new productRepo({
                    name: payload.name,
                    price: payload.price,
                    productImage: payload.productImage
                }).save()
                resolve({
                    name: _doc.name,
                    price: _doc.price,
                    _id: _doc._id,
                    request: {
                        type: 'GET',
                        description: 'TO_FETCH_THIS_PRODUCT',
                        url: 'http://localhost:3000/products/' + _doc._id
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

exports.SearchProductByName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const _doc = await productRepo.find({ name: new RegExp(name) })
            const response = {
                count: _doc.length,
                products: _doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            description: 'REQUEST_TO_FETCH_THIS_PRODUCT',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            resolve(response)
        } catch (err) {
            reject(Boom.badImplementation(err.message).output)
        }
    })
}
exports.GetAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const _doc = await productRepo.find()
            const response = {
                count: _doc.length,
                products: _doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            description: 'REQUEST_TO_FETCH_THIS_PRODUCT',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            resolve(response)
        } catch (err) {
            reject(Boom.badImplementation(err.message).output)
        }
    })
}

exports.SearchProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { error } = await IdValidator.validate(id)
            if (!error) {
                const _doc = await productRepo.find({ _id: id })
                const response = {
                    count: _doc.length,
                    products: _doc.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            productImage: doc.productImage,
                            request: {
                                type: 'GET',
                                description: 'VIEW_ALL_PRODUCTS',
                                url: 'http://localhost:3000/products'
                            }
                        }
                    })
                }
                resolve(response)
            } else {
                reject(Boom.badRequest(error.message).output)
            }
        } catch (err) {
            reject(Boom.badImplementation(err.message).output)
        }
    })
}

exports.UpdateProduct = (id, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { error } = await IdValidator.validate(id)
            if (!error) {
                await productRepo.update({ _id: id }, { $set: payload })
                const response = {
                    message: 'Product has been updated',
                    request: {
                        type: 'GET',
                        description: 'fetch-UPDATED-PRODUCT',
                        url: 'http://localhost:3000/products/' + id
                    }
                }
                resolve(response)
            } else {
                reject(Boom.badRequest(error.message).output)
            }
        } catch (err) {
            reject(Boom.badImplementation(err.message).output)
        }
    })
}
exports.DeleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        let { error } = await IdValidator.validate(id)
        if (!error) {
            try {
                await productRepo.deleteOne({
                    _id: id
                })
                resolve({
                    message: "Product Deleted",
                    request: {
                        type: 'POST',
                        description: 'ADD_NEW PRODUCT',
                        url: 'http://localhost:3000/products'
                    }
                })
            } catch (e) {
                reject(Boom.notFound(e.message).output)
            }
        }
        else {
            reject(Boom.badRequest(error.message).output)
        }
    })
}