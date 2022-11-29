const { type } = require('express/lib/response')
const { default: mongoose } = require('mongoose')
const db = require('../ext/db.js')

const schema = new db.Schema({
    user:{
        type: String,
        required: true,
    },
    deliveryTime: {
        type: String,
        required: true,
        maxlength: 10,
        trim: true
    },
    price: Number,
    service: {
        type: String,
        maxlength: 50
    },
    deliveryDate:{
        type: String,
        required: true,
        maxlength: 10,
        trim: true
    },
    deliveryAdress:{
        type: String,
        required: true,
        maxlength: 50,
    },
    isActive:{
        type: Boolean,
        default: true
    },
    volonteerData:{
        volonteerName: {
            type: String
        },
        volonteerSurname: {
            type: String
        },
        id: {
            type: mongoose.Types.ObjectId
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    productArray:[{
        productPrice: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
            maxlength: 30,
            minlength: 2
        },
        quantity: {
            type: String,
            required: true,
            maxlength: 15,
        }
    }]

})

module.exports = db.model('Order', schema)