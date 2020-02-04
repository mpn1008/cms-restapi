module.exports = function (sequelize, type ){
    return sequelize.define(
        'trainers',{
            trainerId:{
                type:type.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            trainerName:{
                type:type.STRING,
                allowNull: false,
            }
        },{
            timestamps: false
        }
    );
}
