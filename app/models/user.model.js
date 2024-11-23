const { DataTypes } = require("sequelize");
const conexion = require ("../config/db.config.js");


const User = conexion.define("User",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    tableName:"users",
}
)

module.exports= User;