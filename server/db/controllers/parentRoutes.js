const router = require('express').Router();
const auth = require('../../utils/auth');

const Parent = require('../../models/Parent');
const Student = require('../../models/Student');
const ParentStudent = require('../../models/ParentStudent');


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





module.exports = router;