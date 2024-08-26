const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  startProcess: () => ipcRenderer.invoke('start-process'),
  stopProcess: () => ipcRenderer.invoke('stop-process'),
  onStdout: (callback) => ipcRenderer.on('stdout', (event, data) => callback(data)),
  onStderr: (callback) => ipcRenderer.on('stderr', (event, data) => callback(data))
});
