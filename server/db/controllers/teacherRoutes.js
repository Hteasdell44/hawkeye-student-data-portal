const router = require('express').Router();
const auth = require('../../utils/auth');
const { Op } = require('sequelize');
const Student = require('../../models/Student');
const StudentClass = require('../../models/StudentClass');
const Class = require('../../models/Class');
const Teacher = require('../../models/Teacher');
const { TeacherClass, StudentClassAssignment, Assignment } = require('../../models');

router.get('/verify-otp/:email/:oneTimePassword', async (req, res) => {

    const currentTeacher = await Teacher.findOne({ where: { email: req.params.email }});

    if (!currentTeacher) {

        res.send(false);
        return;
    } 

    if (req.params.oneTimePassword == currentTeacher.dataValues.oneTimePassword) {

        res.send(true);
        return;
    }

    res.send(false)
    return;
    
});

router.patch('/update-password', async (req, res) => {

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

router.get('/current-class-name/:classId', async (req, res) => {

    const currentClassName = await Class.findOne({ where: { id: req.params.classId }});

    res.send(currentClassName.name);
});

router.get('/current-classes-students/:classId', async (req, res) => {

    let studentArr = [];
    
    const studentRefs = await StudentClass.findAll({ where: { classId: req.params.classId}});

    for (let i = 0; i < studentRefs.length; i++) {

        studentArr[i] = await Student.findOne({ where: { id: studentRefs[i].dataValues.studentId }});
    }

    res.send(studentArr);
});

router.patch('/update-behavior-report', async (req, res) => {
    
    const currentStudent = await Student.findOne({ where: { id: req.body.studentId}});

    await currentStudent.update({ behaviorReport: req.body.newBehaviorReport })

    res.send(currentStudent);
});

router.get('/current-assignment/:classId/:studentId/:assignmentId', async (req, res) => {
    
    const currentAssignmentRef = await StudentClassAssignment.findOne({ where: { [Op.and]: [
        { studentId: req.params.studentId },
        { classId: req.params.classId },
        { assignmentId: req.params.assignmentId }
      ]}});

    const grade = currentAssignmentRef.dataValues.assignmentGrade;

    const currentAssignmentNameRef = await Assignment.findOne({ where: { id: req.params.assignmentId }});

    const currentAssignmentName = currentAssignmentNameRef.dataValues.name;

    res.send({ name: currentAssignmentName, grade: grade});
});

router.patch('/update-assignment-name', async (req, res) => {
    
    const currentAssignment = await Assignment.findOne({ where: { id: req.body.assignmentId }});

    await currentAssignment.update({ name: req.body.newAssignmentName });

    res.send(currentAssignment);
});

router.patch('/update-assignment-grade', async (req, res) => {
    
    const currentAssignmentRef = await StudentClassAssignment.findOne({ where: { [Op.and]: [
        { studentId: req.body.studentId },
        { classId: req.body.classId },
        { assignmentId: req.body.assignmentId }
      ]}});

      await currentAssignmentRef.update({ assignmentGrade: req.body.newAssignmentGrade });

      res.send(currentAssignmentRef);
});

router.post('/add-new-assignment', async (req, res) => {
    
    const newAssignment = await Assignment.create({ name: req.body.newAssignmentName });

    const assignmentId = newAssignment.dataValues.id;

    const currentClassRefList = await StudentClass.findAll({ where: { classId: req.body.classId }});

    for (let i = 0; i < currentClassRefList.length; i++) {

        await StudentClassAssignment.create({ studentId: currentClassRefList[i].dataValues.studentId, classId: req.body.classId, assignmentId: assignmentId});
    }

    res.send();
});

module.exports = router;