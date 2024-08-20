// Modelo de Datos de Detalle de la orden de Compra
import { DataTypes, Model } from "sequelize";
import TipoProvision from "./TipoProvision";

class MaestroProvision extends Model {}

MaestroProvision.init({
  id_maestro_provision: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // Referencia al Tipo de Provisión
  id_tipo_provision: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoProvision,
      key: 'id_tipo_provision'
    },
    allowNull: false
  },
  codigo_provision: {
    type:DataTypes.STRING,
    allowNull: false
  },
  descripcion_provision: {
    type:DataTypes.STRING,
    allowNull: false
  },
},{
  sequelize,
  modelName:'MaestroProvision',
  tableName:'maestro_provision',
});

export default MaestroProvision;
