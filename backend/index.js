import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

/* MIDEELWARE */
// Middelware to parse cookie's and json
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// My own routes middelware

// end of middelware

app.listen(port, () =>{
  console.log(`Connected to backend at port ${port}`);
});