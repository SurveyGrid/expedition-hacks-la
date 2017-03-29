module.exports = addressesService

function addressesService(options) {
    let Address

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Address = options.modelService

    return {
        getAll: getAll,
        getOne: getOne,
        insert: insert,
        updateOne: updateOne,
        removeOne: removeOne
    }

    function getAll() {
        return Address.find()
    }

    function getOne(queryCondition) {
        return Address.findOne(queryCondition)
    }

    function insert(document) {
        let address = new Address(document)
        return address.save()
    }

    function updateOne(queryCondition, doc) {
        return Address.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Address.findOneAndRemove(queryCondition)
    }
}
