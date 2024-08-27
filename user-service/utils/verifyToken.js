import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.acces_token; // Nombre de la cookie de acceso
    if(!token) return next(createError(401,'No estás autorizado'));

    jwt.verify(token, process.env.JWT, async (err, user) => {
        if(err) next(createError(403, 'Token no válido'));
        req.user = user;
        next();
    })
}

export const verifyUser = (req,res,next) => {
    verifyToken(req, res, (err) => {
        if(err) return next(createError(403, 'Token no válido!'));
        
        next();
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err) return next(createError(403, 'Token no válido!'));

        if(!req.user.isAdmin) return next(createError(403,'Su usuario posee permisos de administrador.'));

        next();
    });
}   