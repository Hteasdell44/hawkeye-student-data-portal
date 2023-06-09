const db = require('../config/connection');
const { Parent, Student } = require('../models')

const parentData = require('./data/parentData.json');
const studentData = require('./data/studentData.json');


const seedDB = async () => {

  await Parent.destroy({where: {}});
  await Student.destroy({where: {}});

  await Parent.bulkCreate(parentData);
  await Student.bulkCreate(studentData);


  console.log('The Hawkeye Student Data Portal Database Has Been Seeded 🦅!');
  process.exit(0);

}

seedDB();