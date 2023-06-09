const Parent = require('./Parent');
const Student = require('./Student');

Parent.belongsToMany(Student, { through: 'ParentStudent', foreignKey: "id" });
Student.belongsToMany(Parent, { through: 'ParentStudent', foreignKey: "id" });

module.exports = { Parent, Student };
