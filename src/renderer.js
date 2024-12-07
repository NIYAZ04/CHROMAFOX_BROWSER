import './index.css';
const backButton=document.getElementById("back-button");
const forwardButton=document.getElementById("forward-button");
const reloadButton=document.getElementById("reload-button");
const searchButton=document.getElementById("search-button");
const newWindowButton=document.getElementById("new-window-button");
const goButton=document.getElementById("go");

//url input 

const urlInputField=document.getElementById("url-input");
//weview 
const webview=document.getElementById("webview");
let url="";
urlInputField.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        event.preventDefault();
        handleUrl()
    }
})
goButton.addEventListener("click",(event)=>{
    event.preventDefault();
    handleUrl();
})

searchButton.addEventListener("click",()=>{
url="https://www.google.com"
urlInputField.value=url;
webview.src=url;
})

backButton.addEventListener("click",()=>{
    webview.goBack();
})
forwardButton.addEventListener("click",()=>{
    webview.goForward();

})

reloadButton.addEventListener("click",()=>{
    webview.reload();
})


webview.addEventListener("did-navigate",(event)=>{
    url=event.url;
    urlInputField.value=url;
})

newWindowButton.addEventListener("click",()=>{
    api.newWindow();
    
})
function handleUrl(){
    let url="";
    const inputUrl=urlInputField.value;
   if(inputUrl.startsWith("http://")|| inputUrl.startsWith("https://")){
    url=inputUrl;
   }else {
    url = "http://"+inputUrl;

   }
    webview.src=url;

}