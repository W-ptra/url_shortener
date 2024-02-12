import {createHash} from "node:crypto";

export const hashing = function(url){
    const hash = createHash("md5").update(url).digest("base64");
    const trim = hash.slice(0,5);
    return trim;
}