const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/addresses'
const addressModel = require('../models/address')
const addressesService = require('../services/addresses.service')({
    modelService: addressModel
})

module.exports = addressesController

function addressesController() {
    return {
        getAll,
        getOneById,
        insert,
        updateById,
        removeById
    }

    function getAll(req, res) {
        addressesService.getAll()
            .then((addresses) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = addresses
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        addressesService.getOne(queryCondition)
            .then((address) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = address
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function insert(req, res) {
        addressesService.insert(req.body)
            .then((address) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = address
                res.status(201)
                    .location(path.join(apiPrefix, address._id.toString()))
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        addressesService.updateOne(queryCondition, req.body)
            .then((address) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        addressesService.removeOne(queryCondition)
            .then((address) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = address
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
