import {database} from "./schema/operation.mjs";
import {hashing} from "./hashing.mjs";
import express from "express";
import cors from "cors";
const app = express();
const port = 8080;
const url = "0.0.0.0";

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/',(req,res,next)=>{
    
    next();
});

app.get('/',(req,res)=>{
    
    res.status(200).send({message:"OK"});
});

app.get('/:short_url',async (req,res)=>{
    const short_url = req.params.short_url;
    
    const data = await database.select(short_url);
    const original_url = data[0].original_url;

    if(original_url === undefined)res.status(200).send("<h1>Invalid short link</h1>");
    else res.status(301).redirect(original_url);
});

app.post('/',async (req,res)=>{
    const original_url = req.body.original_url;
    const alias = req.body.alias;
    const period = req.body.periode;
    
    if(alias === undefined){
        const short_url = await database.insert(alias,original_url,period);
        
        res.status(200).send({short_url});
    }
    else{
        const short_url = hashing(original_url); 
        await database.insert(short_url,original_url,period);
       
        res.status(200).send({short_url});
    }
});

app.listen(port,()=>{
    console.log(`listening to ${url}:${port}`);
});

console.log("test");