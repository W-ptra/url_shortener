const url = "http://localhost:8080";

const makeRequest = async (original_url,alias,periode)=>{

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
    const copyLogo = document.getElementById("mybtn");
    const newCopyLogo = addCopyLogo("copybtn","./resource/copy.svg","width: 1.1rem;height: 1.1rem;");
    copyLogo.appendChild(newCopyLogo);
    message.textContent = url + '/' + short_url;
}

document.getElementById("form").addEventListener('submit',(event)=>{

    const isCopyLogoExist = document.getElementById("copybtn");
    console.log(isCopyLogoExist);
    if(isCopyLogoExist !== null)reset();
    
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
    document.getElementById("original_url").value = "";
    document.getElementById("alias").value = "";
    document.getElementById("period").value = null;
});

async function copy(){
    let copyText = document.getElementById("message").textContent;
    
    await navigator.clipboard.writeText(copyText);

    const img = document.getElementById("copybtn");
    const btn = document.getElementById("mybtn");
    img.src = "./resource/check2-all.svg";
    btn.disabled = true;
}

function addCopyLogo(id,src,style){
    const newImg = document.createElement("img");
    newImg.id = id;
    newImg.src = src;
    newImg.style = style;
    return newImg;
}

function reset(){
    const message = document.getElementById("message");
    const parentElement = document.getElementById("mybtn");
    const childElement = document.getElementById("copybtn");
    parentElement.removeChild(childElement);
    parentElement.disabled = false;
    message.textContent = "";
    
}