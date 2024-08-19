import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  username: { // Ruc del Proveedor
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronizar el modelo con la base de datos
User.sync({ alter: true });

export default User;
  