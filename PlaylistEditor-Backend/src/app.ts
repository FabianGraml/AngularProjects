import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import fs from "fs";
import Playlist from "./playlist";

require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());



function readPlaylists(){
    
    fs.readFile('.\\csv\\playlist.csv', 'utf-8',(err, res) => {
        if(err){
            console.error('YEET');

            return;
        }else{

            const orders =  res.split('\n').slice(1).map((x:string) => new Playlist(x))
            console.dir(orders)
        }
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
//get all customers
app.get("/api/customers", (req, res) => {
    readPlaylists();
    console.log("Hello")
});
