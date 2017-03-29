module.exports = formService

function formService(options) {
    let Form

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Form = options.modelService

    return {
        getAll,
        insert,
        getOne,
        updateOne,
        deleteSurvey
    }

    function getAll(req, res) {
        return Form.find()
    }

    function getOne(queryCondition) {
        return Form.findOne(queryCondition)
    }

    function insert(document) {
        let form = new Form(document)
        return form.save()
    }

    function updateOne(queryCondition, doc) {
        return Form.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function deleteSurvey(queryCondition) {
        return Form.findOneAndRemove(queryCondition)
    }
}
