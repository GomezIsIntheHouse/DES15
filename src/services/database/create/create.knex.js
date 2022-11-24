const knexConfig = require('../config');
const knex = require('knex')(knexConfig)

// knex.schema.createTable('products', table => {
//     table.increments('id'), //crea una clave primaria autoincremental llamada 'id',
//     table.string('code'),
//     table.string('name')
//     table.float('price'),
//     table.integer('stock')


// }).then(()=>{
//     console.info('Table created');

// }).catch(err => {
//     console.error(err)
// }).finally(()=>{
//    knex.destroy();
// });

knex.schema.createTable('messages', table => {
    table.increments('id'), //crea una clave primaria autoincremental llamada 'id',
    table.string('name'),
    table.string('code'),
    table.string('content')



}).then(()=>{
    console.info('Table created');

}).catch(err => {
    console.error(err)
}).finally(()=>{
   knex.destroy();
});