import express from "express";
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js"
import { deletePais, getPais, registraMaestroPais, updatePais } from "../controllers/pais.js";
import { deleteProveedor, getProveedor, registraProveedor, updateProveedor } from "../controllers/proveedor.js";

const router = express.Router();

// Endpoints
/* País (del Proveedor) */
router.post("/registerPais", verifyAdmin, registraMaestroPais);
router.get("/getPais", verifyUser, getPais);
router.put("/updatePais/:id_pais", verifyAdmin, updatePais);
router.delete("/deletePais/:id_pais", verifyAdmin, deletePais);
/* Proveedor */
router.post("/registerProveedor", verifyAdmin, registraProveedor );
router.get("/getProveedor", verifyUser, getProveedor);
router.put("/updateProveedor/:id_proveedor", verifyAdmin, updateProveedor);
router.delete("/deleteProveedor/:id_proveedor", verifyAdmin, deleteProveedor);

export default router;

