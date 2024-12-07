// const {contextBridge, ipcRenderer}=require('electron');


// contextBridge.exposeInIsolatedWorld('api',{
//     newWindow:()=>{
//         ipcRenderer.send('new-window');
//     }
// })

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    newWindow: () => {
        ipcRenderer.send('new-window');
    },
});
