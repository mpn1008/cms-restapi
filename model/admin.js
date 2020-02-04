module.exports = function (sequelize, type ){
    return sequelize.define(
        'admin',{
            idadmin:{
                type:type.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            adName:{
                type:type.STRING,
                allowNull: false,
            },
            adLoginId:{
                type:type.STRING,
                allowNull: false,
            },
            adPassword:{
                type:type.STRING,
                allowNull: false
            }
        },{
            timestamps: false
        }
    );
}
