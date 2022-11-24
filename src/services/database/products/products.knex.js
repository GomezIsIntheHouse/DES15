const knexConfig = require('../config')
const knex = require('knex');
const {v4: uuidv4} = require('uuid');
const { reject } = require('lodash');


class Products{
    constructor(){
        this.knex = knex(knexConfig);
    }

    async createProduct(product){
        Object.assign(product,{
            code:uuidv4()
        })

        return new Promise((resolve, reject)=>{
            this.knex('products').insert(product).then(()=>{
                resolve({
                    success:true,
                    data: product
                })
            }).catch(err=>{
                reject(err)
            })
        })
    }

    async getProductByCode(productCode){
        try {
            const data = await this.knex('products').where('code','=', productCode).select('*');
            if(data.length == 0){
                return{
                    success:false,
                    message: 'Product not fund' 
                }
            }
            const  productFormatted = JSON.parse(JSON.stringify(data[0]));
                return {
                    success: true,
                    data: productFormatted
                }

        } catch (error) {
            console.error(error)
            return{
                success:false,
                message: error.message 
            }
        }
    }

}




module.exports = Products;



























// const productToSql = [
//     {
//         name: 'Plancha',
//         price : 113,
//         code : uuidv4(),
//         stock: 33213,
//     },
//     {
//         name: 'Cocina',
//         price : 152,
//         code : uuidv4(),
//         stock: 122,
//     },
//     {
//         name: 'Auto volador',
//         price : 123.123,
//         code : uuidv4(),
//         stock: 1213,
//     }
// ]



// knex('products').insert(productToSql).then(()=>{
//     console.info('Product saved')
// }).catch(err=>{
//     console.error(err)
// }).finally(()=>{
//     knex.destroy();
// })

// knex('products').select('*').then(data =>{
//     console.log(data)

// }).catch(err => {
//     console.error(err)

// }).finally(() => {
//     knex.destroy();
// })

// knex('products').where('id', '>', 1).select('*').then(data =>{
//     console.log(data)
    
// }).catch(err => {
//     console.error(err)

// }).finally(() => {
//     knex.destroy();
// })

// knex('products').select('*').then(data => {
//     data.map(i => {
//         console.log(JSON.parse(JSON.stringify(i))) //objeto puro

       
//     });
   
//     // console.log(data)
    
// }).catch(err => {
//     console.error(err)

// }).finally(() => {
//     knex.destroy();
// })

// knex('products').where('code', '=','01a47e19-542f-42f5-934c-adaee9692b9a').update({
//     stock:122,
//     price: 100000
// }).then(()=>{
//     console.info('update succefull')
// }).catch(err => {
//         console.error(err)
    
// }).finally(() => {
//         knex.destroy();
// })

// knex('products').where('code', '=','01a47e19-542f-42f5-934c-adaee9692b9a').del()
//     .then(()=>{
//     console.info(`${'01a47e19-542f-42f5-934c-adaee9692b9a'} was deleted succefully`)
// }).catch(err => {
//         console.error(err)
    
// }).finally(() => {
//         knex.destroy();
// })