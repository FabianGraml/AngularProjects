import express, { Request, Response } from "express";

require("dotenv").config();

const app = express();
app.use(express.json());

//get all customers
app.get("/api/customers", (req, res) => {
    console.log("Hello")
});

//get single customer
app.get("/api/customers/:id", (req: Request, res: Response) => {
  
});