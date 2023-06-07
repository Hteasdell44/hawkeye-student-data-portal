const router = require('express').Router();

const parentRoutes = require('./parentRoutes');

router.use('/',  parentRoutes);

module.exports = router;
