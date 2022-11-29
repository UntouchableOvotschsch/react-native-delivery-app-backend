const router = require('express').Router()

const ctrl = require('../controllers/OrderCtrl')

const authMiddleware = require('../middleware/authMiddleware')



router.post('/', ctrl.create)

router.get('/:id', ctrl.getById)

router.get('/userid/:id', ctrl.byUserId)

router.get('/', authMiddleware, ctrl.getAll)

router.put('/:id', ctrl.update)

router.delete('/:id', ctrl.deleteById)

router.post('/volonteer', ctrl.gettingOrder)




module.exports = router