const router = require('express').Router()

const ctrl = require('../controllers/UserCtrl')

const authMiddleware = require('../middleware/authMiddleware')




router.post('/', ctrl.create)

router.get('/:id', ctrl.getById)

router.get('/', ctrl.getAll)

router.put('/:id', ctrl.update)

router.delete('/:id', ctrl.deleteById)

router.post('/login', ctrl.login)

router.get('/login/auth', authMiddleware ,ctrl.loginAuth)




module.exports = router