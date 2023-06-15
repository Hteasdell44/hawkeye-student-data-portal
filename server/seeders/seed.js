const db = require('../config/connection');
const { Parent, Student, Class, Teacher, StudentClass, TeacherClass, ParentStudent, Assignment, StudentClassAssignment } = require('../models');

const parentData = require('./data/parentData.json');
const studentData = require('./data/studentData.json');
const classData = require('./data/classData.json');
const teacherData = require('./data/teacherData.json');


const addStudentsToClasses = async (studentId, classes) => {

  for (let i = 0; i < classes.length; i++) {

    await StudentClass.create({"studentId": studentId, "classId": classes[i]});
  }
}

const seedDB = async () => {

  // Remove All Previously Seeded Info

  await Parent.destroy({where: {}});
  await Student.destroy({where: {}});
  await Class.destroy({where: {}});
  await Teacher.destroy({where: {}});
  await ParentStudent.destroy({where: {}});
  await StudentClass.destroy({where: {}});
  await TeacherClass.destroy({where: {}});
  await Assignment.destroy({where: {}});
  // await StudentClassAssignment.destroy({where: {}});

  // Create Parents, Students, Classes, And Teachers From Imported Data

  await Parent.bulkCreate(parentData);
  await Student.bulkCreate(studentData);
  await Class.bulkCreate(classData);
  await Teacher.bulkCreate(teacherData);

  // Add Each Student To Four Classes
  
  await addStudentsToClasses(8367393, [124, 129, 127, 123]);
  await addStudentsToClasses(8023945, [125, 128, 127, 123]);
  await addStudentsToClasses(8878402, [129, 128, 127, 124]);
  await addStudentsToClasses(8610934, [123, 128, 125, 127]);
  await addStudentsToClasses(8442394, [127, 123, 129, 125]);

// Assign Teachers To Classes

  await TeacherClass.create({"teacherEmail": "Ewoodsworth@school.email.com", "classId": 123});
  await TeacherClass.create({"teacherEmail": "Smedley@school.email.com", "classId": 124});
  await TeacherClass.create({"teacherEmail": "Dalbright@school.email.com", "classId": 125});
  await TeacherClass.create({"teacherEmail": "Sbosser@school.email.com", "classId": 126});
  await TeacherClass.create({"teacherEmail": "Cvalcovich@school.email.com", "classId": 127});
  await TeacherClass.create({"teacherEmail": "Ewoodsworth@school.email.com", "classId": 128});
  await TeacherClass.create({"teacherEmail": "Dalbright@school.email.com", "classId": 129});

  // Create Assignments

  await Assignment.create({"name": "Homework 1"});
  await Assignment.create({"name": "Homework 2"});
  await Assignment.create({"name": "Homework 3"});
  await Assignment.create({"name": "Quiz 1"});
  await Assignment.create({"name": "Homework 4"});
  await Assignment.create({"name": "Homework 5"});
  await Assignment.create({"name": "Test 1"});

  await Assignment.create({"name": "Homework 6"});
  await Assignment.create({"name": "Homework 7"});
  await Assignment.create({"name": "Homework 8"});
  await Assignment.create({"name": "Quiz 2"});
  await Assignment.create({"name": "Homework 9"});
  await Assignment.create({"name": "Homework 10"});
  await Assignment.create({"name": "Test 2"});

  await Assignment.create({"name": "Homework 11"});
  await Assignment.create({"name": "Homework 12"});
  await Assignment.create({"name": "Homework 13"});
  await Assignment.create({"name": "Quiz 3"});
  await Assignment.create({"name": "Homework 14"});
  await Assignment.create({"name": "Homework 15"});
  await Assignment.create({"name": "Test 3"});

  // Assign Assignments To Students



  const studentList = await Student.findAll({});
  const assignmentList = await Assignment.findAll({});
  
  for (let j = 0; j < studentList.length; j++) {

    const currentStudentId = studentList[j].dataValues.id;
    const currentStudentClassRefs = await StudentClass.findAll({ where: { studentId: currentStudentId }});

    for (let k = 0; k < currentStudentClassRefs.length; k++) {

      for (let i = 0; i < assignmentList.length; i++) {

        await StudentClassAssignment.create({"studentId": currentStudentId, "classId": currentStudentClassRefs[k].dataValues.classId, "assignmentId": assignmentList[i].dataValues.id, "assignmentGrade": Math.floor(Math.random() * 41) + 60});
      }

    }

  }

  
  console.log('The Hawkeye Student Data Portal Database Has Been Seeded 🦅!');
  process.exit(0);

}

seedDB();