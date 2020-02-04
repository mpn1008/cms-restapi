module.exports = function (sequelize, type ){
    return sequelize.define(
        'trainees',{
            traineeId:{
                type:type.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            traineeName:{
                type:type.STRING,
                allowNull: false
            },
            traineeEmail:{
                type:type.STRING,
                allowNull: false,
            }
        },{
            timestamps: false
        }
    );
}