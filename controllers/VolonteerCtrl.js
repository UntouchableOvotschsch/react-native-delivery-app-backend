const Volonteer = require('../models/volonteer')
const BaseCtrl = require('./BaseCtrl')
const bcrypt = require('bcryptjs')

class VolonteerCtrl extends BaseCtrl {

    constructor(model) {
        super(model)
    }

    async create (req, res) {

        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        let volonteer = new Volonteer({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            mail: req.body.mail,
            img: req.body.img,
            login: req.body.login,
            password: hashedPassword
        })

        volonteer.save((err, data) => {
            if (err) {
                return res.status(400).json({ message: 'Error creating new Volonteer', err })
            }

            res.json({ message: 'Volonteer was created', data })
        })
    }

    update(req, res) {

        let reqId = req.params.id

        let reqBody = req.body

        Volonteer.findByIdAndUpdate(reqId, reqBody, { runValidators: true }, (err, data) => {
            if (err) {
                return res.status(400).json({ message: 'Error update Volonteer with id: ' + reqId, err })
            }

            res.json({
                message: 'Volonteer with id ' + data._id + ' was updated'
            })
        })

    }

    async auth(req, res){
        const {login, password} = req.body

        const volonteer = await Volonteer.findOne({login})

        if (!volonteer){
            return res.status(400).json({message: 'Неверный логин'})
        }

        const isMatch = await bcrypt.compare(password, volonteer.password)

        if(!isMatch){
            return res.status(400).json({message: 'Неверный пароль'})
        }

        const data = {
            name: volonteer.name,
            surname: volonteer.surname,
            id: volonteer._id
        }
        res.json({message: 'Успешно', data})

    }
}

module.exports = new VolonteerCtrl(Volonteer)