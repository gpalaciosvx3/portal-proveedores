// Modelo de Proveedor
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pais from './Pais.js';
import Usuario from './Usuarios.js';

class Proveedor extends Model {}

Proveedor.init({
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  ruc_proveedor: {
    type: DataTypes.STRING(11),  // Restringe el tamaño a 2 caracteres
    allowNull: false,
    unique: true,
    validate: { // Se ejecutan automáticamente antes de que un registre sea creado o actualizado.
      len: {
          args: [11, 11],
          msg: 'Ruc del Proveedor debe ser de 11 carácteres.'
      },
      isNumeric:{
        msg: 'RUC solo puede contener números.'
      },
      notNull:{
        msg: 'RUC del proveedor es obligatorio.'
      },
      notEmpty:{
        msg: 'RUC del Proveedor no puede estar vacío.'
      }
    }
  },
  razon_social_proveedor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull:{
        msg: 'Razón social del proveedor es obligatorio.'
      },
      notEmpty:{
        msg: 'Razón social del Proveedor no puede estar vacío.'
      }
    }
  },
  direccion_proveedor: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Proveedor',
  tableName: 'maestro_proveedor', // Ajusta la nomenclatura de la tabla si es necesario
  timestamps: true, // Esto crea los campos createdAt y updatedAt
  hooks:{ 
    // Antes de guardar un string haga un trim
    beforeSave: async (prov) => {
      const PaisReferenciado = await Pais.findOne({
        where: {id_pais: prov.id_pais}
      });
      if(!PaisReferenciado) throw new Error(`id_pais ${prov.id_pais} no existe en la bd.`);
    }
  }
});

// Un proveedor solo puede tener un país
Proveedor.belongsTo(Pais, {
  foreignKey: 'id_pais',
  onDelete: 'RESTRICT'  // O 'CASCADE'
});

// Varios usuarios puede tener al mismo proveedor
Proveedor.hasMany(Usuario, {
  foreignKey: 'id_proveedor',
  onDelete: 'RESTRICT'  // O 'CASCADE'
});

export default Proveedor;
 
