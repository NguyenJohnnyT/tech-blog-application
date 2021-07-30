const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
    try {
        res.status(200).render('test');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;