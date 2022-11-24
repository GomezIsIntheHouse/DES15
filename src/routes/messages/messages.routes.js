const express = require('express')
const router = express.Router();
const _ = require('lodash')
const Message = require('../../services/database/messages/messages.knex')

const messageService = new Message();

router.post('/', async(req, res, next) => {
    const { body } = req;
    if(_.isNil(body)){
        return res.status(200).json({
            success:false,
            message : 'Bad request'
        })
    }
    try {
        const data = await messageService.createMessage(body)
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/', async(req, res, next) => {

   

    try {
        const data = await messageService.getMessages()
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})


module.exports = router;