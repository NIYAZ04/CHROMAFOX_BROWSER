import { app, BrowserWindow , ipcMain} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

const createWindow = () => {
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag:true,
      disableHardwareAcceleration: true
    },
  });
  //bro seriously 
mainWindow.setAlwaysOnTop(true,'screen')

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

 //mainWindow.webContents.openDevTools(); so irritating
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();

// in case you are reding this : You are doing great work in your life ...CC
// Mir Niyazul Haque 
  }
});

ipcMain.on("new-window",createWindow)