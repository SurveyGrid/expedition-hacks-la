module.exports = graphsService

function graphsService(options) {
    let Graph

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Graph = options.modelService

    return {
        getAll,
        getOne,
        insert,
        updateOne,
        deleteOne
    }

    function getAll() {
        return Graph.find()
    }

    function getOne(queryCondition) {
        return Graph.findOne(queryCondition)
    }

    function insert(document) {
        let graph = new Graph(document)
        return graph.save()
    }

    function updateOne(queryCondition, doc) {
        return Graph.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function deleteOne(queryCondition) {
        return Graph.findOneAndRemove(queryCondition)
    }
}
