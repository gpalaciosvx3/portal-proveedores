import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";
import { createError } from "../utils/error.js";

// Login
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Busca usuario en BD
        const user = await Usuario.findOne({
            attributes: ['username', 'password', 'isAdmin'],
            where: {username}
        });
        if(!user) return next(createError(404, 'Usuario no se encuentra registrado en la bd.'));

        // Compara Password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return next(createError(401, 'Contraseña incorrecta.'));

        // Registrar JWT
        const token = jwt.sign({
            id_user: user.id_user,
            isAdmin: user.isAdmin
        }, process.env.JWT);

        // Enviar token como cookie en la rpta
        res
            .cookie("acces_token",token,{
                httpOnly: true
            })
            .status(200)
            .json({
                message: 'Autentificación correcta!',
                token: token,
                user: user
            });
    } catch (error) {
        next(error);
    }
}


