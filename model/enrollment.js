let {course} = require('../connection');
module.exports = function (sequelize, type ){
    let enrollment = sequelize.define(
        'enrollments',{
            en_Id:{
                type:type.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            en_course_Id:{
                type:type.INTEGER,
                referencees:{
                    model:'Courses',
                    key:'courseId'
                }
            },
            en_trainee_Id:{
                type: type.INTEGER,
                references:{
                    model: 'Trainees',
                    key: 'traineeId'
                }
            }
        },
        {
            timestamps: false
        });
    return enrollment;
}