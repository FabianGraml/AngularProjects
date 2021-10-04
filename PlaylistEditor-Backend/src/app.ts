import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cors from "cors";


require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
//get all customers
app.get("/api/customers", (req, res) => {
    console.log("Hello")
});

//get single customer
app.get("/api/customers/:id", (req: Request, res: Response) => {
  
});