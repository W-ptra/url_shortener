const url = "http://localhost:8080";

const makeRequest = async (original_url,alias,periode=1)=>{
    const requestBody = {
        original_url,
        alias,
        periode
    }

    const respond = await fetch(url,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(requestBody)
    });
    const data = await respond.json();
    const short_url = data.short_url;
    const message = document.getElementById("message");
    console.log(short_url);
    message.textContent = "http://localhost:8080/"+short_url;
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