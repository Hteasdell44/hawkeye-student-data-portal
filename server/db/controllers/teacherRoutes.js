const router = require('express').Router();
const auth = require('../../utils/auth');
const { Op } = require('sequelize');
const Parent = require('../../models/Parent');
const Student = require('../../models/Student');
const ParentStudent = require('../../models/ParentStudent');
const StudentClass = require('../../models/StudentClass');
const Class = require('../../models/Class');
const Teacher = require('../../models/Teacher');
const { TeacherClass, StudentClassAssignment, Assignment } = require('../../models');

router.post('/verify-otp', async (req, res) => {

    const currentTeacher = await Teacher.findOne({ where: { email: req.body.email }});

    console.log(req.body)

    if (!currentTeacher) {

        res.send(false);
        return;
    } 

    if (req.body.oneTimePassword == currentTeacher.dataValues.oneTimePassword) {

        res.send(true);
        return;
    }

    res.send(false)
    return;
    
});

router.post('/update-password', async (req, res) => {

    const currentTeacher = await Teacher.findOne({ where: { email: req.body.email }});

    if (!currentTeacher) {

        res.send("No teacher found with that email...");
        return;
    } 

    if (currentTeacher.dataValues.password == null) {

        await currentTeacher.update(
            { password: req.body.password},
            { where: { email: req.body.email}}
        );
    
        res.send(currentTeacher)
        return;
    }

    res.send("You've already set a password for your account. Please contact admin to change your password again.");
    return;
    
    
});

router.post('/login', async (req, res) => {

    const teacherExists = await Teacher.findOne({ where: { email: req.body.email }});

    if (!teacherExists) {
      res.send('No teacher found with that email!');
      return;
    }

    if (teacherExists.password == req.body.password) {

      const token = auth.signToken(teacherExists);
      res.send(token);
      return;
    }

    res.send('Your password is incorrect!');
    return;

});


module.exports = router;