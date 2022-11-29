require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
    
        try {
    
            let token = req.headers.authorization
            if (!token) {
                return res.status(401).json({message: 'Ошибка авторизации'})
            }
    
            const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY)


            
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.include(role)){
                    hasRole = true                    
                } 
            });

            if (!hasRole){
                return res.status(401).send("Нет доступа") 

            }
            

            next()
            
        } catch (error) {
            return res.status(401).send("Неверный токен")  
        }
    }
}