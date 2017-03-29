const router = require('express').Router()
const hackersRoutes = require('./hackers.routes')
const usersRoutes = require('./users.routes')
const sitesRoutes = require('./sites.routes')
// const plotlyRoutes = require('./plotly.routes')
const addressesRoutes = require('./addresses.routes')
const formRoutes = require('./form.routes')
const graphRoutes = require('./graphs.routes')

// register routes ///////////////////////////
router.use('/api/hackers', hackersRoutes)
router.use('/api/users', usersRoutes)
// router.use('/api/plotly', plotlyRoutes)
router.use('/api/addresses', addressesRoutes)
router.use('/api/form', formRoutes)
router.use('/api/graphs', graphRoutes)

// Handle API 404
router.use('/api/*', function(req, res, next) {
    res.sendStatus(404)
})

router.use(sitesRoutes)

// Handle 500
router.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
        return next()
    }

    // Log it
    console.error(err.stack)

    // Redirect to error page
    res.sendStatus(500)
})

module.exports = router
