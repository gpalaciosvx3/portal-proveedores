import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import morgan from "morgan";
// Importa rutas del Controllador

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

/* MIDEELWARE */
// Middelware importados
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Mis Middelware

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