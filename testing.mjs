const url = "localhost:80";
const makeRequest = async (orignal_url,alias,periode=1)=>{
    const requestBody = {
        orignal_url,
        alias,
        periode
    }

    const respond = await fetch(url,{
        method:'GET',
        headers: {
            "content-type": "application/json"
        }
    });

    console.log(respond);
}

console.log( await makeRequest("testing"));