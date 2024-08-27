// Modelo de Usuario
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaaulValue: false,
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
  timestamps: true, // Esto crea los campos createdAt y updatedAt
  hooks:{ 
    // Hash de la clave antes de crear el usuario
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

// Un usuario solo puede tener un proveedor
const initAssociations = async () => {
  const { default: Proveedor } = await import('./Proveedor.js');
  Usuario.belongsTo(Proveedor, {
    foreignKey: 'id_proveedor'
  });
};

initAssociations();

export default Usuario;
 
