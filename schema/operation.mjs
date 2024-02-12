import dotenv from "dotenv";dotenv.config();
import { createConnection } from "mysql2/promise";

const connection = await createConnection({
    host : process.env.db_host,
    port : process.env.db_port,
    user : process.env.db_user,
    password : process.env.db_password,
    database : process.env.db_database
});

export const database = {
    async insert(short_url,original_url,expired){
       
        const isExist = await this.select(short_url);
        if(isExist !== undefined)return short_url;
        
        const statement = "INSERT INTO url(short_url,original_url,created,expired) VALUES (?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP + INTERVAL ? HOUR);";
        const values = [short_url, original_url, expired];
        
        const [result,fiels] = await connection.query(
            statement,values
        );
        return short_url;
    },

    async select(short_url){
        const statement = "SELECT original_url FROM url WHERE short_url = ?;";
        const values = [short_url];
        const [result,fields] =  await connection.query(statement,values);

        if(result.length === 0)return undefined;
        return result;
    }
}