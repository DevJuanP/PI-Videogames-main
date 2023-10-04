const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['PC']
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg'
    },
    released: {
      type: DataTypes.DATEONLY,//yyyy-mm-dd
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.001,
      validate: {
        min: 0,
        max: 5,
      }
    }, 
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'API'
    }
  },  {timestamps: false});
};
