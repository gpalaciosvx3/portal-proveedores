import bcrypt from "bcryptjs";
import Usuario from "../models/Usuarios.js";
import { createError } from "../utils/error.js";

// Get Usuarios
export const getUsuarios = async (req,res,next) => {
  try {
    console.log('S1111');
    const Users = await Usuario.findAll({
      order: [
        ['createdAt', 'ASC'],
      ]
    });
      
    const UsersJSON = Users.map(user => user.toJSON());

    res.status(200).json({
      User: UsersJSON
    });
  } catch (error) {
    next(error);
  }
}

// Registrar Usuario
export const register = async (req,res,next) => {   
  try {          
      // Valida que no Exista usuario duplicado
      const {username, password, id_proveedor,...others} = req.body;
      const existeUser = await Usuario.findOne({where: {username}});
      if(!id_proveedor) return next(createError(404,`Es necesario id_proveedor.`));
      if(existeUser) return next(createError(400,'Usuario ya se encuentra registrado'));

      const newUser = await Usuario.create({
        username,
        password,
        id_proveedor,  
        isAdmin: others.isAdmin || false,
        logo: others.logos || null
      });
      
      res.status(200).json({
          message: 'Usuario creado con exito',
          newUser: newUser.toJSON()
      });
  } catch (error) {
      next(error);
  }
}

// Update Usuario
export const updateUsuario = async (req,res,next) => {
  try {
    const {username, password, ...others} = req.body;
    const {id_user} = req.params;
    console.log('id_user: ', id_user);
    const existeUser = await Usuario.findByPk(id_user);
    
    /* VALIDACIONES */
    if(!existeUser) return next(createError(400,'Usuario no existe en la bd.'));
    if(!password) return next(createError(400,'Paswword es obligatorio.'));
        
    // Hash de password con bcrypt
    const salt = bcrypt.genSaltSync(10);    
    const hash = bcrypt.hashSync(password, salt);    

    const updateUser = await Usuario.update(
      { 
        username: username,
        password: hash,
        id_proveedor: others.id_proveedor ?? existeUser.id_proveedor,
        isAdmin: others.isAdmin ?? existeUser.isAdmin,
        logo: others.logo ?? existeUser.logo
      },
      {where: {id_user} }
    );

    res.status(200).json({
      message: `Se ha actualizado el usuario ${username} exitosamente.`
    });
  } catch (error) {
    next(error);
  }
}