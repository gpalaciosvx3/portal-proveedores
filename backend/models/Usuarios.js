// Modelo de Usuario
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Usuario extends Model {}

Usuario.init({
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios', // Ajusta la nomenclatura de la tabla si es necesario
  timestamps: true // Esto crea los campos createdAt y updatedAt
});

export default Usuario;
 
