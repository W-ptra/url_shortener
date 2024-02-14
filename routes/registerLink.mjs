import { database } from "../schema/database.mjs";
import { hashing } from "../hashing.mjs";

export const registerLink = async (req, res) => {
    const original_url = req.body.original_url;
    try {
        await fetch(original_url);
    }
    catch (error) {
        return res.status(404).send({ message: "link is not accessible" });
    }

    const alias = req.body.alias;
    const period = req.body.periode;
    
    if (alias.length !== 0) {
        const short_url = await database.insert(alias, original_url, period);
        return res.status(200).send({ short_url });
    }
    
    const short_url = hashing(original_url);
    await database.insert(short_url, original_url, period);
    return res.status(200).send({ short_url });   
}