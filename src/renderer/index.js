"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var container = document.getElementById('root');
var root = (0, client_1.createRoot)(container);
root.render(<App_1.default />);
// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', function (arg) {
    // eslint-disable-next-line no-console
    console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
window.electron.ipcRenderer.on('perplexity-llama2', function (args) {
    // comes from main.ts ipcMain.on('prompt-hidden-chat',...) sendFn(responseHTML, responseText)
    var target = document.getElementById('streamingPromptResponseContainer');
    if (target) {
        target.innerHTML = args;
    }
});
