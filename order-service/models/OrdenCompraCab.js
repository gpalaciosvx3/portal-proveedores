// Modelo de Datos de Cabecera de la Orden de Compra
import { DataTypes, Model } from "sequelize";

class OrdenCompraCab extends Model {}

OrdenCompraCab.init({
  id_orden_compra_cab: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // Referencia a id_user (id del proveedor)
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nro_orden_compra: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fecha_documento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  importe_bruto: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  importe_neto:{
    type: DataTypes.DECIMAL,
    allowNull: false
  }
},{
  sequelize,
  modelName: 'OrdenCompraCab',
  tableName: 'orden_compra_cab',
  timestamps: true
});

export default OrdenCompraCab;