import { database } from "./schema/database.mjs"
import { redirect } from "./routes/redirect.mjs";
import { registerLink } from "./routes/registerLink.mjs";
import { logger } from "./middleware/logger.mjs";
import express from "express";
import cors from "cors";
const app = express();
const port = 8080;
//const url = "0.0.0.0";

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static("web"));

app.use('/',logger);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"./web/index.html"));
});

app.get('/:short_url',redirect);

app.post('/', registerLink);

app.use((req,res,next)=>{
    res.status(404).send("<h1>404 Not Found</h1>");
})

app.listen(port, () => {
    console.log(`listening to port: ${port}`);
});

setInterval(async () => {
    console.log("deleting expired link");
    await database.delete();
}, 3600000)