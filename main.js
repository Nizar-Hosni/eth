const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window
    console.log("Creating window...");
    let win = new BrowserWindow({
        width: 1920,
        height: 1080, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // Load the index.html of the app.
    win.loadFile(path.join(__dirname, 'ui.html'));

    // Show the window when it's ready
    win.once('ready-to-show', () => {
        console.log("Window ready to show...");
        win.show();
        win.focus();
    });

    // Handle the window close event
    win.on('closed', () => {
        win = null;
    });
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
