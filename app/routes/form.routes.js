const router = require('express').Router()
const formController = require('../controllers/form.controller')()

module.exports = router

// api routes ===========================================================
router.get('/', formController.getAllSurvey)
router.get('/:id', formController.getOneSurvey)
router.post('/', formController.insertSurvey)
router.put('/:id', formController.updateSurvey)
router.delete('/:id', formController.removeSurvey)
