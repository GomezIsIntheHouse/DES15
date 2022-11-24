const knexConfig = require('../config')
const knex = require('knex');
const {v4: uuidv4} = require('uuid');
const { reject } = require('lodash');

class Messages{
    constructor(){
        this.knex = knex(knexConfig);
    }
    async createMessage(message){
        try{

            Object.assign(message, {code: uuidv4()})

            return new Promise((resolve, reject) => {
                this.knex('message').insert(message).then(()=>{

                    resolve({
                        success: true,
                        data: message
                    })

                }).catch(err => {
                    reject(err)
                })
            })

   
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getMessages(){
        try {
            const data = await this.knex('messages').select('*');

            if(data.length == 0){
                return{
                    success:false,
                    message: 'Menssages not fund' 
                }
            }
            const  messageFormatted = JSON.parse(JSON.stringify(data));
                return {
                    success: true,
                    data: messageFormatted
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

module.exports = Messages;