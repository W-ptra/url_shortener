export const logger = (req,res,next)=>{
    res.on('finish',()=>{
        let current_date_time = new Date();
        let formatted_date = 
        `${current_date_time.getFullYear()}-${current_date_time.getMonth()}-${current_date_time.getDate()} ${current_date_time.getHours()}:${current_date_time.getMinutes()}:${current_date_time.getSeconds()}`;
    
        let method = req.method;
        let url = req.url;
        let status = res.statusCode;
        let log = `${formatted_date} ${method} ${url} ${status}`;
    
        console.log(log);
    });
    next();
}