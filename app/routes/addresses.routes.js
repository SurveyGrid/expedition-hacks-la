const router = require('express').Router()
const addressesController = require('../controllers/addresses.controller')()

module.exports = router

// api routes ===========================================================
router.get('/', addressesController.getAll)
router.get('/:id', addressesController.getOneById)
router.post('/', addressesController.insert)
router.put('/:id', addressesController.updateById)
router.delete('/:id', addressesController.removeById)
