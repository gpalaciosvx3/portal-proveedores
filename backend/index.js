import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan";
// Importa rutas del Controllador
import authRoutes from "./routes/auth.js";
import usuarioRoutes from "./routes/usuario.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

/* MIDEELWARE */
// Middelware importados
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Mis Middelware
app.use("/api/auth", authRoutes);
app.use("/api/usuario", usuarioRoutes)

// Middelware to get Errors.
app.use((err,req,res,next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Somethin went wrong!';
  return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
  });
}); 

/* --------- */

app.listen(port, () =>{
  console.log(`Connected to backend at port ${port}`);
});