import {database} from "./schema/operation.mjs";
import express from "express";
const app = express();
const port = 8080;
const url = "0.0.0.0";

app.get('/',(req,res)=>{
    switch(req.headers["content-type"]){
        case 'application/json':
            res.status(200).send({message:"OK"});
            break;
        default:
            res.status(200).send({message:"OK"});
            break;
    }
});

app.listen(port,()=>{
    console.log(`listening to ${url}:${port}`);
});