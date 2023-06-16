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

router.post('/determine-user-type', async (req, res) => {

  const isParent = await Parent.findOne({ where: { email: req.body.email }});

  if (!isParent) {

    res.send("teacher");
    return;
  }

  res.send("parent");
  
});

router.post('/signup', async (req, res) => {

    const userExists = await Parent.findOne({ where: { email: req.body.email }});

      if (userExists) {
        console.log('A user with that email already exists!');
        return;
      }

      const newUser = await Parent.create({ ...req.body });
      const token = auth.signToken(newUser);
      res.send(token);
    
});

router.post('/', async (req, res) => {

  const userExists = await Parent.findOne({ where: { email: req.body.email }});

    if (!userExists) {
      console.log('No user found with that email!');
      return;
    }

    // Allows Seeded Users without bcrypt encryption to login if their password directly matches what's stored in the db.

    if (userExists.password == req.body.password) {

      const token = auth.signToken(userExists);
      res.send(token);
      return;
    }

    if (!userExists.checkPassword(req.body.password)) {
      console.log('Your password is incorrect!');
      return;
    }

    const token = auth.signToken(userExists);
    res.send(token);
  
});

router.post('/add-student', async (req, res) => {

  const studentExists = await Student.findOne({ where: { id: req.body.studentId }});

  if (studentExists) {

    console.log(req.body);

    const addedStudent =  await ParentStudent.create({ ...req.body });

    res.send(addedStudent)

  } else {

    res.send('No Student Found With That ID')

  }

  
  
});

router.post('/parents-students', async (req, res) => {

  const studentIds = await ParentStudent.findAll({ where: { parentEmail: req.body.parentEmail }});

  let studentArr = [];

  if (studentIds.length == 0) { 
    
    res.send(studentArr)
    return;
  }

  for (let i = 0; i < studentIds.length; i++) {

    studentArr[i] = await Student.findOne({ where: { id: studentIds[i].dataValues.studentId }});
  }

  res.send(studentArr);

});

router.post('/current-student', async (req, res) => {

  const currentStudent = await Student.findOne({ where: { id: req.body.studentId}})
  res.send(currentStudent);

});

router.post('/current-student-classes', async (req, res) => {

  const studentsClasses = await StudentClass.findAll({ where: { studentId: req.body.studentId }});

  let classArr = [];

  if (studentsClasses.length == 0) { 
    
    res.send(classArr)
    return;
  }

  for (let i = 0; i < studentsClasses.length; i++) {
   
    classArr[i] = await Class.findOne({ where: { id: studentsClasses[i].dataValues.classId }});
  }

  res.send(classArr);

});

router.post('/current-student-classes-teachers', async (req, res) => {

  const studentsClasses = await StudentClass.findAll({ where: { studentId: req.body.studentId }});
  console.log(studentsClasses);

  let classArr = [];

  for (let i = 0; i < studentsClasses.length; i++) {
   
    classArr[i] = await Class.findOne({ where: { id: studentsClasses[i].dataValues.classId }});
  }

  let teacherArr = [];

  if (classArr.length == 0) {

    res.send(teacherArr);
    return;
  }

  for (let i = 0; i < classArr.length; i++) {

    const teacherRef = await TeacherClass.findOne({ where: { classId: classArr[i].id }});
    teacherArr[i] = await Teacher.findOne({ where: { email: teacherRef.dataValues.teacherEmail }});

  }

  res.send(teacherArr);

});

router.post('/get-student-assignments', async (req, res) => {

  let assignmentsList = [];

  const assignmentRefs = await StudentClassAssignment.findAll({ where: { [Op.and]: [
    { studentId: req.body.studentId },
    { classId: req.body.classId }
  ]}});

  for (let i = 0; i < assignmentRefs.length; i++) {

    const currentAssignment = await Assignment.findOne( { where: { id: assignmentRefs[i].dataValues.assignmentId }});
    const assignmentGrade = assignmentRefs[i].dataValues.assignmentGrade;

    assignmentsList[i] = {assignment: currentAssignment, assignmentGrade: assignmentGrade };
  }

  res.send(assignmentsList);

});

module.exports = router;