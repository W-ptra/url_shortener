const url = "http://127.0.0.1:8080";

const makeRequest = async (orignal_url,alias,periode=1)=>{
    const requestBody = {
        orignal_url,
        alias,
        periode
    }

    const respond = await fetch(url);
    
    console.log(respond.json);
}

document.getElementById("form").addEventListener('submit',(event)=>{
    event.preventDefault();

    const orignal_url = document.getElementById("original_url").value;
    const alias = document.getElementById("alias").value;
    const period = document.getElementById("period").value;

    if(orignal_url.length === 0){
        const message = document.getElementById("message");
        message.textContent = "Link can't empty";
        return;
    }

    makeRequest(orignal_url,alias,period);
});