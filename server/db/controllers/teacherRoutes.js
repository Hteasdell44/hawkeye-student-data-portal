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

router.post('/classes', async (req, res) => {

    let classArr = [];

    const classRefList = await TeacherClass.findAll({ where: { teacherEmail: req.body.teacherEmail }});

    for (let i = 0; i < classRefList.length; i++) {

        classArr[i] = await Class.findOne({ where: { id: classRefList[i].classId }});
    }

    res.send(classArr);

});

router.post('/current-class-name', async (req, res) => {

    const currentClassName = await Class.findOne({ where: { id: req.body.classId }});

    res.send(currentClassName.name);
});

router.post('/current-classes-students', async (req, res) => {

    let studentArr = [];
    
    const studentRefs = await StudentClass.findAll({ where: { classId: req.body.classId}});

    for (let i = 0; i < studentRefs.length; i++) {

        studentArr[i] = await Student.findOne({ where: { id: studentRefs[i].dataValues.studentId }});
    }

    res.send(studentArr);
});

router.post('/update-behavior-report', async (req, res) => {
    
    const currentStudent = await Student.findOne({ where: { id: req.body.studentId}});

    await currentStudent.update({ behaviorReport: req.body.newBehaviorReport })

    res.send(currentStudent);
});

router.post('/current-assignment', async (req, res) => {
    
    const currentAssignmentRef = await StudentClassAssignment.findOne({ where: { [Op.and]: [
        { studentId: req.body.studentId },
        { classId: req.body.classId }
      ]}});

    const grade = currentAssignmentRef.dataValues.assignmentGrade;

    const currentAssignmentNameRef = await Assignment.findOne({ where: { id: req.body.assignmentId }});

    const currentAssignmentName = currentAssignmentNameRef.dataValues.name;

    res.send({ name: currentAssignmentName, grade: grade});
});

router.post('/update-assignment-name', async (req, res) => {
    
    const currentAssignment = await Assignment.findOne({ where: { id: req.body.assignmentId }});

    await currentAssignment.update({ name: req.body.newAssignmentName });

    res.send(currentAssignment);
});

router.post('/update-assignment-grade', async (req, res) => {
    
    const currentAssignmentRef = await StudentClassAssignment.findOne({ where: { [Op.and]: [
        { studentId: req.body.studentId },
        { classId: req.body.classId },
        { assignmentId: req.body.assignmentId }
      ]}});

      await currentAssignmentRef.update({ assignmentGrade: req.body.newAssignmentGrade });

      res.send(currentAssignmentRef);
});


module.exports = router;