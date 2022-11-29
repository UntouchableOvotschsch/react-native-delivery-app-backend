require('dotenv').config()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({message: 'Ошибка токена'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.body = decoded

        next()
        
    } catch (error) {
        return res.status(401).send("Неверный токен")  
    }
}