// Modelo de Pais
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Pais extends Model {}

Pais.init({
  id_pais: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  codigo_pais: {
    type: DataTypes.STRING(2),  // Restringe el tamaño a 2 caracteres
    allowNull: false,
    validate: {
      len: {
          args: [2, 2],
          msg: 'El código de país debe tener exactamente 2 caracteres'
      },
      notNull:{
        msg: 'Código de País es obligatorio'
      },
      notEmpty:{
        msg: 'Código de País no puede estar vacío'
      }
    }
  },
  desc_pais: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull:{
        msg: 'Descripción de País es obligatorio'
      },
      notEmpty:{
        msg: 'Descripción de País no puede estar vacío'
      }
    }
  },

}, {
  sequelize,
  modelName: 'Pais',
  tableName: 'maestro_pais', // Ajusta la nomenclatura de la tabla si es necesario
  timestamps: true, // Esto crea los campos createdAt y updatedAt
  hooks:{ 
    // Antes de guardar un string haga un trim
    beforeSave: async (pais) => {
      for(const field of Object.keys(pais.dataValues)){
        if(typeof pais.dataValues[field] === 'string' && pais.dataValues[field] !== null) {
          pais.dataValues[field] = pais.dataValues[field].trim();
        }      
      }
    },
    // Antes de eliminar verifica que no se esté referenciado en maestro de Proveedores
    beforeDestroy: async (pais) => {
      const { default: Proveedor } = await import('./Proveedor.js');
      const ProveedorReferenciado = await Proveedor.findOne({
        where: {id_pais: pais.id_pais}
      });
      if(ProveedorReferenciado) throw new Error('No se puede eliminar el país porque está referenciado en al menos un proveedor.');
    }
  }
});

// Muchos 
const initAssociations = async () => {
  const { default: Proveedor } = await import('./Proveedor.js');
  Pais.hasMany(Proveedor, {
    foreignKey: 'id_pais'
  });
};

initAssociations();

export default Pais;
 
