const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dish_types: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM({
          values: [
            "lunch",
            "main course",
            "main dish",
            "breakfast",
            "morning meal",
            "brunch",
            "dinner",
            "side dish",
            "dip",
            "sauce",
            "condiment",
            "spread",
            "soup",
          ],
        })
      ),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB(),
      allowNull: false,
    },
  }),
    {
      timestamps: true,
      createdAt: true,
    };
};
