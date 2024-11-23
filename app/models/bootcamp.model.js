const { DataTypes } = require("sequelize");
const conexion = require ("../config/db.config.js");


const Bootcamp = conexion.define("Bootcamp",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
              args: true,
              msg: "El campo nombre (title) es requerido"
            },
          },
    },
    cue:{
        type:DataTypes.INTEGER,
        validate: {
            notEmpty: {
              args: true,
              msg: "Números de CUE es necesario, minimo 5 y máximo 20"
            },
        },
    },
    description:{
        type:DataTypes.STRING,
        validate: {
            notEmpty: {
              args: true,
              msg: "Se debe introducir una descripción"
            },
          },
    }
},{
  tableName:"bootcamps",
}

)

module.exports = Bootcamp;