const router = require('express').Router()

const plotlyController = require('../controllers/plotly.controller')()

router.post('/', plotlyController.insert)

module.exports = router
