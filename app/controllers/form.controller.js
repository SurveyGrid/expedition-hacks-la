const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/form'
const formModel = require('../models/form')
const formService = require('../services/form.service')({
    modelService: formModel
})

module.exports = formController

function formController() {
    return {
        getAllSurvey,
        insertSurvey,
        getOneSurvey,
        updateSurvey,
        removeSurvey
    }

    function getAllSurvey(req, res) {
        formService.getAll()
            .then((surveys) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = surveys
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getOneSurvey(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        formService.getOne(queryCondition)
            .then((survey) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = survey
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function insertSurvey(req, res) {
        formService.insert(req.body)
            .then((survey) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = survey
                res.status(201)
                    .json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function updateSurvey(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        formService.updateOne(queryCondition, req.body)
            .then((survey) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    function removeSurvey(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        formService.deleteSurvey(queryCondition)
            .then((survey) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = survey
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
