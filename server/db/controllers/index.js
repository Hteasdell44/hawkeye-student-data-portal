const router = require('express').Router();

const parentRoutes = require('./parentRoutes');
const teacherRoutes = require('./teacherRoutes');

router.use('/',  parentRoutes);
router.use('/teacher', teacherRoutes);

module.exports = router;
