import express from "express";
import {getUsuarios, register, updateUsuario} from "../controllers/usuario.js";
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

// Endpoints
router.get("/getUsuarios", verifyUser, getUsuarios);
router.post("/register", verifyAdmin, register);
router.put("/updateUsuario", verifyAdmin, updateUsuario);

export default router;

