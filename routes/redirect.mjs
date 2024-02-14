import { database } from "../schema/database.mjs";

export const redirect = async (req, res) => {
    const short_url = req.params.short_url;
    const data = await database.select(short_url);
    
    if (data === undefined)return res.status(404).send("<h1>Invalid short link</h1>");

    const original_url = data[0].original_url;
    res.status(301).redirect(original_url);
}