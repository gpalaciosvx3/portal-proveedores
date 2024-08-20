// Modelo para Definir los Tipos de Provisión que puede recibir nuestro cliente
import { DataTypes, Model } from "sequelize";

class TipoProvision extends Model {}

TipoProvision.init({
  id_tipo_provision: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  codigo_tipo_provision: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc_tipo_provision: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize,
  modelName: 'TipoProvision',
  tableName: 'tipo_provision',
  timestamps: true
})

export default TipoProvision;