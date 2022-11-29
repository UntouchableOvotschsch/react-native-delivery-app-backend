const db = require('../ext/db.js')

const schema = new db.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    surname:{
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        unique: true,
        trim: true
    },
    mail:{
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        unique: true,
        trim: true
    },
    img: String,
    login: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 5,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 10,
        trim: true
    },

    create: {
        type: Date,
        default: Date.now
    }

})

module.exports = db.models.Volonteer || db.model('Volonteer', schema)