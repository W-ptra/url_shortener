const url = "http://localhost:8080";
const makeRequest = async (orignal_url,alias,periode=1)=>{
    const requestBody = {
        orignal_url,
        alias,
        periode
    }

    const respond = await fetch(url);
    const data = await respond.json();
    console.log(data.message);
    
}

makeRequest("test");