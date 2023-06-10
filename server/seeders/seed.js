const db = require('../config/connection');
const { Parent, Student, Class, Teacher, StudentClass, TeacherClass, ParentStudent } = require('../models');

const parentData = require('./data/parentData.json');
const studentData = require('./data/studentData.json');
const classData = require('./data/classData.json');
const teacherData = require('./data/teacherData.json');


const addStudentsToClasses = async (studentId, classes) => {

  for (let i = 0; i < classes.length; i++) {

    await StudentClass.create({"studentId": studentId, "classId": classes[i]});
  }
}

const addTeacherToClasses = async () => {
  
}

const seedDB = async () => {

  await Parent.destroy({where: {}});
  await Student.destroy({where: {}});
  await Class.destroy({where: {}});
  await Teacher.destroy({where: {}});
  await ParentStudent.destroy({where: {}});
  await StudentClass.destroy({where: {}});
  await TeacherClass.destroy({where: {}});

  await Parent.bulkCreate(parentData);
  await Student.bulkCreate(studentData);
  await Class.bulkCreate(classData);
  await Teacher.bulkCreate(teacherData);
  

  await addStudentsToClasses(8367393, [124, 129, 127, 123]);
  await addStudentsToClasses(8023945, [125, 128, 127, 123]);
  await addStudentsToClasses(8878402, [129, 128, 127, 124]);
  await addStudentsToClasses(8610934, [123, 128, 125, 127]);
  await addStudentsToClasses(8442394, [127, 123, 129, 125]);

  await TeacherClass.create({"teacherEmail": "Ewoodsworth@school.email.com", "classId": 123});
  await TeacherClass.create({"teacherEmail": "Smedley@school.email.com", "classId": 124});
  await TeacherClass.create({"teacherEmail": "Dalbright@school.email.com", "classId": 125});
  await TeacherClass.create({"teacherEmail": "Sbosser@school.email.com", "classId": 126});
  await TeacherClass.create({"teacherEmail": "Cvalcovich@school.email.com", "classId": 127});
  await TeacherClass.create({"teacherEmail": "Ewoodsworth@school.email.com", "classId": 128});
  await TeacherClass.create({"teacherEmail": "Dalbright@school.email.com", "classId": 129});
  
  console.log('The Hawkeye Student Data Portal Database Has Been Seeded 🦅!');
  process.exit(0);

}

seedDB();