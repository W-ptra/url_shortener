import { database } from "./schema/operation.mjs";
import { hashing } from "./hashing.mjs";
import express from "express";
import cors from "cors";
const app = express();
const port = 8080;
const url = "0.0.0.0";

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.path} ${req.url} ${req.ip}`);
    next();
});

app.get('/', (req, res) => {

    res.status(200).send({ message: "OK" });
});

app.get('/:short_url', async (req, res) => {
    const short_url = req.params.short_url;

    const data = await database.select(short_url);
    const original_url = data[0].original_url;

    if (original_url === undefined) res.status(200).send("<h1>Invalid short link</h1>");
    else res.status(301).redirect(original_url);
});

app.post('/', async (req, res) => {
    const original_url = req.body.original_url;
    try {
        await fetch(original_url);
    }
    catch (error) {
        return res.status(404).send({ message: "link is not accessible" });
    }

    const alias = req.body.alias;
    const period = req.body.periode;
    console.log(alias);
    if (alias.length !== 0) {
        console.log("undefine");
        const short_url = await database.insert(alias, original_url, period);
        res.status(200).send({ short_url });
    }
    else {
        console.log("not undefine");
        const short_url = hashing(original_url);
        await database.insert(short_url, original_url, period);
        res.status(200).send({ short_url });
    }
});

app.listen(port, () => {
    console.log(`listening to ${url}:${port}`);
});

setInterval(async () => {
    console.log("regular deleting expired link");
    await database.delete();
}, 3600000)