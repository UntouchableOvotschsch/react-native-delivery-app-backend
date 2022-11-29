const Order = require('../models/order')
const User = require('../models/User')
const Volonteer = require('../models/volonteer')


const BaseCtrl = require('./BaseCtrl')

class OrderCtrl extends BaseCtrl{

    constructor(model){
        super(model)
    }

    create(req, res) {
        
        let order = new Order(req.body)
    
        order.save( (err, data) => {
            if(err) {
                return res.status(400).json({ message: 'Error creating new Order', err})
            }
    
            res.json({message: 'Order was created', data})
        })
    }

    update(req, res) {

        let reqId = req.params.id
    
        let reqBody = req.body

        Order.findByIdAndUpdate(reqId, reqBody, {runValidators: true}, (err, data) => {
            if(err) {
                return res.status(400).json({ message: 'Error update Order', err})
            }
    
            res.json({
                message: 'Order was updated',
                data
            })
        })
    
    }

    async getById(req, res) {
        try{

            let order = await Order.findById(req.params.id)
            let user = await User.findById(order.user)

            res.json({
                ...order.toObject(),
                user:{
                    id: user._id,
                    login: user.login
                }
            })

        }catch(e){
            res.status(400).json({ message: 'Error get', e})
        }
    }

    byUserId(req, res){
        Order.find({user: `${req.params.id}`},(err, data) => {
            if(err){
                return res.status(400).json({ message: 'Error get All', err})
            }
    
            res.json(data)
        })
    }

    // volonteer

    async gettingOrder(req, res){
        try {
            const orderId = req.body.orderId
            const voloteerId = req.body.voloteerId

            let volonteer = await Volonteer.findById(voloteerId)
            let order = await Order.findById(orderId)

            if(!volonteer || !order){
                return res.status(400).json({ message: 'Incorrect data'})
            }

            if(!order.volonteerData.isEmpty()) {
                return res.status(400).json({ message: 'This order was booked'})
            }

            Order.findByIdAndUpdate(orderId, {
                volonteerData: {
                    volonteerName: volonteer.name,
                    volonteerSurname: volonteer.surname,
                    id: voloteerId,
                }
            }, {runValidators: true}, (err)=>{
                if(err) {
                    return res.status(400).json({ message: 'Error getting Order', err})
                }
                res.json({
                    message: 'Order was updated'
                })
            })
            
        } catch (error) {
            res.status(400).json({ message: 'Error getting Order', error})    
        }
    }
}

module.exports = new OrderCtrl(Order)