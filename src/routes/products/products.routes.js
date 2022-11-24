const express = require('express')
const router = express.Router();
const _ = require('lodash')
const Products = require('../../services/database/products/products.knex')

const productService = new Products();

router.post('/', async(req, res, next) => {
    const {body}=req;
    if(_.isNil(body)){
        return res.status(200).json({
            success:false,
            message : 'Bad request'
        })
    }
    try {
        const data = await productService.createProduct(body);
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:productCode', async(req, res, next) => {
    const { productCode } = req.params;
    
    if(_.isNil(productCode)){
        return res.status(200).json({
            success:false,
            message : 'Bad request'
        })
    }

    try {
        const data = await productService.getProductByCode(productCode);
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router;