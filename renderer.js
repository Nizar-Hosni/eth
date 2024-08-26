const { ipcRenderer } = require('electron');

let isRunning = false;
let timer = 0;
let interval;

document.getElementById('startButton').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        ipcRenderer.send('start-mining');
        interval = setInterval(() => {
            timer++;
            document.getElementById('timeElapsed').innerText = `${timer}s`;
        }, 1000);
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        ipcRenderer.send('stop-mining');
        clearInterval(interval);
    }
});

ipcRenderer.on('new-address', (event, address) => {
    document.getElementById('currentAddress').innerText = address;
});

ipcRenderer.on('found-wallet', (event, wallet) => {
    const walletList = document.getElementById('foundWallets');
    const listItem = document.createElement('li');
    listItem.innerText = `${wallet.address} - ${wallet.balance}`;
    walletList.appendChild(listItem);
});
