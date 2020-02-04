let Sequelize = require('sequelize');

let adminModel = require('./model/admin');
let trainerModel = require('./model/trainer');
let traineeModel = require('./model/trainee');
let courseModel = require('./model/course');
let enrollModel = require('./model/enrollment');

let sqlize = new Sequelize('fpt', 'root', '123DSA123dsa',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max: 10,
        min: 0,
        accquire:30000,
        idle:10000
    }
});
sqlize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
sqlize.sync().then(() => {
    console.log("synced");
});
let admin = adminModel(sqlize,Sequelize);
let trainer = trainerModel(sqlize,Sequelize);
let trainee = traineeModel(sqlize,Sequelize);
let course = courseModel(sqlize,Sequelize);
let enroll = enrollModel(sqlize,Sequelize);

// 1 - many
course.belongsTo(trainer, {foreignKey:'trainer_Id'}, {targetKey:'trainerId'});
trainer.hasMany(course,{foreignKey:'trainer_Id'});

// join table
enroll.belongsTo(course,{foreignKey:'en_course_Id'}, {targetKey:'courseId'});
enroll.belongsTo(trainee,{foreignKey:'en_trainee_Id'}, {targetKey:'traineeId'});

// many - many
course.hasMany(enroll,{foreignKey:'en_course_Id'});
trainee.hasMany(enroll, {foreignKey:'en_trainee_Id'});

module.exports = {
    admin,
    trainer,
    trainee,
    course,
    enroll
}