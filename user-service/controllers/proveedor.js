import Pais from "../models/Pais.js";
import Proveedor from "../models/Proveedor.js";
import { createError } from "../utils/error.js";

// Genera un Proveedor para maestro de Proveedores
export const registraProveedor = async (req, res, next) => {
  try {
    const {ruc_proveedor, razon_social_proveedor, id_pais,...others} = req.body; 
    /* VALIDACIONES */
    // 1. Parámetros ingresados en el body.
    if(!ruc_proveedor || !razon_social_proveedor) return next(createError(400,'Campo ruc_proveedor y razon_social_proveedor son obligatorios.'));
    if(!id_pais) return next(createError(400,'Referencia al País con id_pais es obligatoria.'));
    // 2. Evitar Duplicados.
    const [existeRucProveedor, existeRazSocialProveedor] = await Promise.all([
      Proveedor.findOne({ where: { ruc_proveedor } }),
      Proveedor.findOne({ where: { razon_social_proveedor } })
    ]);
    if(existeRucProveedor) return next(createError(400,'RUC de proveedor ya existe'));
    if(existeRazSocialProveedor) return next(createError(400,'Razón social del proveedor ya existe'));
    /* fin VALIDACIONES */
    const newProveedor = await Proveedor.create({
      ruc_proveedor,
      razon_social_proveedor,
      id_pais,
      direccion_proveedor: others.direccion_proveedor || null
    });

    res.status(200).json({
      message: 'Proveedor creado con éxito',
      proveedor: newProveedor.toJSON()
    });
  } catch (error) {
    next(error);
  }
}

// Get Proveedor
export const getProveedor = async (req,res,next) => {
  try {
    const {id_proveedor, ruc_proveedor, razon_social_proveedor} = req.body;
    let whereConditions = {};

    /* Query Dinámico */
    if(id_proveedor) whereConditions.id_proveedor = id_proveedor;
    if(ruc_proveedor) whereConditions.ruc_proveedor = ruc_proveedor;
    if(razon_social_proveedor) whereConditions.razon_social_proveedor = razon_social_proveedor;

    const ProveedorQuery = await Proveedor.findAll({
      where: whereConditions,
      order: [
        ['createdAt', 'ASC']
      ]
    });

    const ProveedorJSON = ProveedorQuery.map(prov => prov.toJSON());

    res.status(200).json({
      Proveedor: ProveedorJSON
    });

  } catch (error) {
    next(error);
  }
}

// Actualiza Proveedor
export const updateProveedor = async (req,res,next) => {
  try {
    const {id_proveedor} = req.params;
    if(!id_proveedor) return next(createError(400,`id_proveedor en url es obligatorio.`));
    const {...updateCampos} = req.body;
    // Obtienes datos del Proveedor para mantener en valor anterior si no se envían en el body.
    const prov = await Proveedor.findByPk(id_proveedor);
    console.log(updateCampos);
    if(!prov) return next(createError(404,`Proveedor con id ${id_proveedor} no se encontró en la bd.`));
    
    const [canrowsActualizadas] = await Proveedor.update(
      updateCampos,
      {where: {id_proveedor} }
    );
    
    if(canrowsActualizadas === 0) return next(createError(404,'No se actualizaron los registros en la BD.'));

    res.status(200).json({
      message: `Se ha actualizado el provedor con id_proveedor ${id_proveedor} exitosamente.`
    });
  } catch (error) {
    next(error);
  }
}

// Elimina Proveedor
export const deleteProveedor = async (req,res,next) => {
  try {
    const {id_proveedor} = req.params;
    const rowDeleteProv = await Proveedor.destroy({
      where: {id_proveedor}
    });

    if(rowDeleteProv === 0) return next(createError(404,`Proveedor no encontrado, no se eliminó ningún registro.`));
    
    res.status(200).json({
      message: `Se ha eliminado el proveedor con id ${id_proveedor} exitosamente.`
    });
  } catch (error) {
    next(error);
  }
  
}
