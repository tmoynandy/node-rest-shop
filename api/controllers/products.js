const { CreateProduct, SearchProductByName, GetAllProducts, SearchProductById, UpdateProduct, DeleteProduct } = require("../services/products")


exports.products_get_all = async (req, res, next) => {
    const { name } = req.query;
    try {
        let response;
        if (name) {
            response = await SearchProductByName(name)
        } else {
            response = await GetAllProducts();
        }
        res.json(response)
    }
    catch (err) {
        next(err)
    }

}

exports.products_get_one = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const response = await SearchProductById(productId)
        res.json(response)
    } catch (err) {
        next(err)
    }

}


exports.products_patch = async (req, res, next) => {
    const { productId } = req.params;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    try {
        const response = await UpdateProduct(productId, updateOps)
        res.json(response)
    } catch (err) {
        next(err)
    }
}


exports.products_delete = async (req, res, next) => {
    const { productId } = req.params;
    try {
        let response = await DeleteProduct(productId)
        res.json(response)
    } catch (err) {
        next(err)
    }


}


exports.products_create_product = async (req, res, next) => {
    const payload = {
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    }
    try {
        let result = await CreateProduct(payload)
        res.json({
            ...result
        })
    } catch (e) {
        next(e)
    }

}