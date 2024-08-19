import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan";
import sequelize from "./config/database.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

/* MIDEELWARE */
// Middelware importados
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// My own routes middelware
app.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).send('Conectado a bd psql.');
  } catch (error) { 
    res.status(500).send(`Falló conexión con bd: ${error.message}`)
  }
});


/* --------- */

app.listen(port, () =>{
  console.log(`Connected to backend at port ${port}`);
});