// Modelo de Datos de Detalle de la orden de Compra
import { DataTypes, Model } from "sequelize";
import OrdenCompraCab from "./OrdenCompraCab";
import MaestroProvision from "./MaestroProvision";

class OrdenCompraDet extends Model {}

OrdenCompraDet.init({
  id_orden_compra_det: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // Referencia a id_orden_compra_cab
  id_orden_compra_cab: {
    type: DataTypes.INTEGER,
    references: {
      model: OrdenCompraCab,
      key: 'id_orden_compra_cab'
    },
    allowNull: false
  },
  // Referencia al maestro de Provisión utilizado en la OC(mate,serv,etc..)
  id_maestro_provision: {
    type: DataTypes.INTEGER,
    references: {
      model: MaestroProvision,
      key: 'id_maestro_provision'
    },
    allowNull: false
  },
  posicion: {
    type: DataTypes.INTEGER,
    allowNull: false  
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
  modelName:'OrdenCompraDet',
  tableName:'orden_compra_det',

});

export default OrdenCompraDet;