module.exports = function (sequelize, type ){
    return sequelize.define(
        'courses',{
            courseId:{
                type:type.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            courseName:{
                type:type.STRING,
                allowNull: false
            },
            trainer_Id:{
                type: type.INTEGER,
                references:{
                    model: 'Trainers',
                    key: 'trainerId'
                }
            }
        },
        {
            timestamps: false
        });
}