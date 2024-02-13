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
    const copyLogo = document.getElementById("copyLogo");
    const newCopyLogo = addCopyLogo("copybtn","./resource/copy.svg","width: 1.1rem;height: 1.1rem;");
    copyLogo.appendChild(newCopyLogo);
    message.textContent = "http://localhost:8080/"+short_url;
}

document.getElementById("form").addEventListener('submit',(event)=>{
    event.preventDefault();

    const orignal_url = document.getElementById("original_url").value;
    const alias = document.getElementById("alias").value;
    let period = document.getElementById("period").value;

    if(period.length === 0)period=1;

    if(orignal_url.length === 0){
        const message = document.getElementById("message");
        message.textContent = "Link can't empty";
        return;
    }

    makeRequest(orignal_url,alias,period);
    //reset
    
});

async function copy(){
    let copyText = document.getElementById("message").textContent;
    
    await navigator.clipboard.writeText(copyText);
    //alert("copied to clipboard");

    const img = document.getElementById("copybtn");
    img.src = "./resource/check2-all.svg";
    console.log("test");
}

function addCopyLogo(id,src,style){
    const newImg = document.createElement("img");
    newImg.id = id;
    newImg.src = src;
    newImg.style = style;
    return newImg;
}