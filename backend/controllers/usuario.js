import bcrypt from "bcryptjs";
import Usuario from "../models/Usuarios.js";
import { createError } from "../utils/error.js";

// Get Usuarios
export const getUsuarios = async (req,res,next) => {
  try {
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
      const {username, password,...others} = req.body;
      const existeUser = await Usuario.findOne({where: {username}});
      if(existeUser) next(createError(400,'Usuario ya se encuentra registrado'));

      const newUser = await Usuario.create({
          username:req.body.username,
          password:password,
          isAdmin:req.body.isAdmin || false,
      });

      // await newUser.save();
      
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
    const existeUser = await Usuario.findOne({where: {username}});
    
    /* VALIDACIONES */
    if(!existeUser) next(createError(400,'Usuario no existe en la bd.'));
    if(!password) next(createError(400,'Paswword es obligatorio.'));
        
    // Hash de password con bcrypt
    const salt = bcrypt.genSaltSync(10);    
    const hash = bcrypt.hashSync(password, salt);    

    const updateUser = await Usuario.update(
      { 
        username: username,
        password: hash,
        isAdmin: others.isAdmin || existeUser.isAdmin,
        logo: others.logo || existeUser.logo
      },
      {where: {username} }
    );

    res.status(200).json({
      message: `Se ha actualizado el usuario ${username} exitosamente.`
    });
  } catch (error) {
    next(error);
  }
}