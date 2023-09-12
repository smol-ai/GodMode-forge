"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
var electron_1 = require("electron");
var electronHandler = {
    ipcRenderer: {
        sendMessage: function (channel) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            electron_1.ipcRenderer.send.apply(electron_1.ipcRenderer, __spreadArray([channel], args, false));
        },
        on: function (channel, func) {
            var subscription = function (_event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            };
            electron_1.ipcRenderer.on(channel, subscription);
            return function () {
                electron_1.ipcRenderer.removeListener(channel, subscription);
            };
        },
        once: function (channel, func) {
            electron_1.ipcRenderer.once(channel, function (_event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        },
    },
    // https://gist.github.com/samcodee/d4320006d366a2c47048014644ddc375
    electronStore: {
        get: function (val, def) {
            var x = electron_1.ipcRenderer.sendSync('electron-store-get', val, def);
            return x;
        },
        set: function (property, val) {
            electron_1.ipcRenderer.send('electron-store-set', property, val);
        },
        // Other method you want to add like has(), reset(), etc.
    },
    browserWindow: {
        reload: function () {
            electron_1.ipcRenderer.send('reload-browser');
        },
        getAlwaysOnTop: function () {
            var x = electron_1.ipcRenderer.sendSync('get-always-on-top');
            return x;
        },
        setAlwaysOnTop: function (val) {
            electron_1.ipcRenderer.send('set-always-on-top', val);
        },
        promptHiddenChat: function (prompt) {
            electron_1.ipcRenderer.send('prompt-hidden-chat', 'perplexity-llama2', prompt);
        },
        enableOpenAtLogin: function (prompt) {
            electron_1.ipcRenderer.send('enable-open-at-login');
        },
        disableOpenAtLogin: function (prompt) {
            electron_1.ipcRenderer.send('disable-open-at-login');
        },
    },
};
electron_1.contextBridge.exposeInMainWorld('electron', electronHandler);
electron_1.contextBridge.exposeInMainWorld('settings', {
    getGlobalShortcut: function () {
        return electron_1.ipcRenderer.invoke('get-global-shortcut');
    },
    setGlobalShortcut: function (shortcut) {
        return electron_1.ipcRenderer.invoke('set-global-shortcut', shortcut);
    },
    getPlatform: function () {
        return electron_1.ipcRenderer.invoke('get-platform');
    },
    getOpenAtLogin: function () {
        return electron_1.ipcRenderer.invoke('get-open-at-login');
    },
});
