const router = require('express').Router()

router.use('/', (req, res ) => {
    res.send('okay')
})

module.exports = router