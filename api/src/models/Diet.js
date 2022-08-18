const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diet", {
    name: {
      type: DataTypes.ENUM(
        "vegan",
        "gluten free",
        "whole 30",
        "lacto ovo vegetarian",
        "paleolithic",
        "primal",
        "foodmap friendly",
        "pescatarian",
        "dairy free",
        "ketogenic"
      ),
      allowNull: false,
    },
  });
};
