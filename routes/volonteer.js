const router = require('express').Router()

const ctrl = require('../controllers/VolonteerCtrl')



router.post('/', ctrl.create)

router.get('/:id', ctrl.getById)

// router.get('/', ctrl.getAll)

router.put('/:id', ctrl.update)

router.delete('/:id', ctrl.deleteById)

router.post('/auth', ctrl.auth)




module.exports = router