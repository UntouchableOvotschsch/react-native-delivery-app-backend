require('dotenv').config()
const User = require('../models/user')
const BaseCtrl = require('./BaseCtrl')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class UserCtrl extends BaseCtrl {

    constructor(model) {
        super(model)
    }

    async create(req, res) {

        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        let user = new User({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            mail: req.body.mail,
            img: req.body.img,
            login: req.body.login,
            password: hashedPassword,
        })

        user.save((err, data) => {
            if (err) {
                return res.status(400).json({ message: 'Error creating new User', err })
            }

            res.json({ message: 'User was created', data })
        })
    }

    update(req, res) {

        let reqId = req.params.id

        let reqBody = req.body

        User.findByIdAndUpdate(reqId, reqBody, { runValidators: true }, (err, data) => {
            if (err) {
                return res.status(400).json({ message: 'Error update User with id: ' + reqId, err })
            }

            res.json({
                message: 'User with id ' + data._id + ' was updated'
            })
        })

    }

    async login(req, res) {
        const { login, password } = req.body

        const user = await User.findOne({ login })

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })

        const data = {
            name: user.name,
            surname: user.surname,
            id: user._id,
            token: token
        }
        res.json({ message: 'Успешно', data })

    }

    async loginAuth(req, res) {
        try {
            const { id } = req.body
            const user = await User.findOne({ _id: id })
            if (!user) {
                res.status(400).json({ message: 'Ошибка авторизации' })
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
            const data = {
                name: user.name,
                surname: user.surname,
                id: user._id,
                token: token
            }
            res.status(200).json({ message: 'Успешная авторизация', data })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Ошибка авторизации', data })
        }
    }


}

module.exports = new UserCtrl(User)