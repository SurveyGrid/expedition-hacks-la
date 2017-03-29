const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/graphs'
const graphModel = require('../models/graph')
const graphsService = require('../services/graphs.service')({
    modelService: graphModel
})

module.exports = graphsController

function graphsController() {
    return {
        getAll,
        getOne,
        insert,
        updateOne,
        deleteOne
    }

    function getAll(req, res) {
        graphsService.getAll()
            .then((graphs) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = graphs
                res.json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getOne(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        graphsService.getOne(queryCondition)
            .then((graph) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = graph
                res.json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function insert(req, res) {
        graphsService.insert(req.body)
            .then((graph) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = graph
                res.status(201)
                    .location(path.join(apiPrefix, graph._id.toString()))
                    .json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function updateOne(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        graphsService.updateOne(queryCondition, req.body)
            .then((graph) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function deleteOne(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        graphsService.deleteOne(queryCondiditon)
            .then()
    }
}

