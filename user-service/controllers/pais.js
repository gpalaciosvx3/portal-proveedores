import Pais from "../models/Pais.js";
import { createError } from "../utils/error.js";

// Genera un País para maestro de Países
export const registraMaestroPais = async (req, res, next) => {
  try {
    const {codigo_pais, desc_pais } = req.body; 
    if(!codigo_pais || !desc_pais) return next(createError(400,'Campo codigo_pais y desc_pais son obligatorios.'));
    const [existeCodigoPais, existeDescPais] = await Promise.all([
      Pais.findOne({ where: { codigo_pais } }),
      Pais.findOne({ where: { desc_pais } })
    ]);
    /* VALIDACION */
    if(existeCodigoPais) return next(createError(400,'Código de País ingresado ya existe'));
    if(existeDescPais) return next(createError(400,'Descripción de país ya existe'));

    const newPais = await Pais.create({
      codigo_pais,
      desc_pais
    });

    res.status(200).json({
      message: 'País creado con éxito',
      pais: newPais.toJSON()
    });
  } catch (error) {
    next(error);
  }
}

// Get país
export const getPais = async (req,res,next) => {
  try {
    const {id_pais, codigo_pais, desc_pais} = req.body;
    let whereConditions = {};

    /* Forma de manera dinámica condiciones para el Where */
    if(id_pais) whereConditions.id_pais = id_pais;
    if(codigo_pais) whereConditions.codigo_pais = codigo_pais;
    if(desc_pais) whereConditions.desc_pais = desc_pais;

    const Pais_query = await Pais.findAll({
      where: whereConditions,
      order: [
        ['createdAt', 'ASC'],
      ]
    });
      
    const PaisJSON = Pais_query.map(pais => pais.toJSON());

    res.status(200).json({
      User: PaisJSON
    });
  } catch (error) {
    next(error);
  }
}

// Actualiza País
export const updatePais = async (req,res,next) => {
  try {
    const {id_pais} = req.params;
    const {codigo_pais, desc_pais} = req.body;
    const [canrowsActualizadas, rowActualizadas] = await Pais.update(
      {
        codigo_pais,
        desc_pais
      },
      {where: {id_pais}}
    ); 

    if(canrowsActualizadas === 0) return next(createError(404,'País no encontrado'));

    res.status(200).json({
      message: `Se ha actualizado el país con id_pais ${id_pais} exitosamente.`
    });
  } catch (error) {
    next (error);
  }
}

// Elimina País
export const deletePais = async (req,res,next) => {
  try {
    const {id_pais} = req.params;
    /* Elimina y devuelve el nro de filas eliminadas */
    const rowDeletePais = await Pais.destroy({
      where: {id_pais: id_pais}
    });

    if(rowDeletePais === 0) return next(createError(404,'País no encontrado'));

    res.status(200).json({
      message: `Se ha eliminado el país con id ${id_pais} exitosamente.`
    });
  } catch (error) {
    next(error);
  }
}