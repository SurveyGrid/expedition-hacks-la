const router = require('express').Router()
const graphsController = require('../controllers/graphs.controller')()

module.exports = router

// api routes =========================================
router.get('/', graphsController.getAll)
router.get('/:id', graphsController.getOne)
router.post('/', graphsController.insert)
router.put('/:id', graphsController.updateOne)
router.delete('/:id', graphsController.deleteOne)
