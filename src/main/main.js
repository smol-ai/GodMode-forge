"use strict";
/* eslint global-require: off, no-console: off, promise/always-return: off */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
var path_1 = require("path");
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var electron_log_1 = require("electron-log");
var electron_store_1 = require("electron-store");
var menu_1 = require("./menu");
var apify_1 = require("./apify");
var util_1 = require("./util");
var utils_1 = require("../lib/utils");
var perplexity_llama_1 = require("../providers/perplexity-llama");
var electron_context_menu_1 = require("electron-context-menu");
var store = new electron_store_1.default();
var AppUpdater = /** @class */ (function () {
    function AppUpdater() {
        electron_log_1.default.transports.file.level = 'info';
        electron_updater_1.autoUpdater.logger = electron_log_1.default;
        electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    }
    return AppUpdater;
}());
var mainWindow = null;
store.reset();
electron_1.ipcMain.on('ipc-example', function (event, arg) { return __awaiter(void 0, void 0, void 0, function () {
    var msgTemplate;
    return __generator(this, function (_a) {
        msgTemplate = function (pingPong) { return "IPC test: ".concat(pingPong); };
        console.log(msgTemplate(arg));
        event.reply('ipc-example', msgTemplate('pong'));
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('electron-store-get', function (event, val, defaultVal) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        event.returnValue = store.get(val, defaultVal);
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('electron-store-set', function (event, property, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        store.set(property, val);
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('reload-browser', function (event, property, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.reload();
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('set-always-on-top', function (event, newVal) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.setAlwaysOnTop(newVal);
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('get-always-on-top', function (event, property, val) { return __awaiter(void 0, void 0, void 0, function () {
    var bool;
    return __generator(this, function (_a) {
        bool = mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isAlwaysOnTop();
        event.returnValue = bool;
        return [2 /*return*/];
    });
}); });
var appFolder = path_1.default.dirname(process.execPath);
var updateExe = path_1.default.resolve(appFolder, '..', 'Update.exe');
var exeName = path_1.default.basename(process.execPath);
electron_1.ipcMain.on('enable-open-at-login', function (event, property, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        electron_1.app.setLoginItemSettings({
            openAtLogin: true,
            path: updateExe,
            args: [
                '--processStart',
                "\"".concat(exeName, "\""),
                '--process-start-args',
                "\"--hidden\"",
            ],
        });
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('disable-open-at-login', function (event, property, val) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        electron_1.app.setLoginItemSettings({
            openAtLogin: false,
            path: updateExe,
            args: [
                '--processStart',
                "\"".concat(exeName, "\""),
                '--process-start-args',
                "\"--hidden\"",
            ],
        });
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.handle('get-open-at-login', function () {
    var openAtLogin = electron_1.app.getLoginItemSettings().openAtLogin;
    console.log(openAtLogin);
    return openAtLogin;
});
electron_1.ipcMain.on('prompt-hidden-chat', function (event, channel, prompt) { return __awaiter(void 0, void 0, void 0, function () {
    var sendFn, done;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sendFn = function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return mainWindow === null || mainWindow === void 0 ? void 0 : (_a = mainWindow.webContents).send.apply(_a, __spreadArray([channel], args, false));
                };
                return [4 /*yield*/, (0, apify_1.streamChatResponse)({
                        provider: perplexity_llama_1.default,
                        prompt: prompt,
                        sendFn: sendFn,
                    })];
            case 1:
                done = _a.sent();
                event.returnValue = done; // {responseHTML, responseText}
                return [2 /*return*/];
        }
    });
}); });
/*
 * Return the user's device platform (macOS, Windows, Linux) for use in
 * keyboard shortcuts and other platform-specific features in the renderer.
 */
electron_1.ipcMain.handle('get-platform', function () {
    return process.platform;
});
// ipcMain.on('open-settings-window', () => {
//   createSettingsWindow();
// });
if (process.env.NODE_ENV === 'production') {
    var sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}
var isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
if (isDebug) {
    require('electron-debug')();
}
var installExtensions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var installer, forceDownload, extensions;
    return __generator(this, function (_a) {
        installer = require('electron-devtools-installer');
        forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        extensions = ['REACT_DEVELOPER_TOOLS'];
        return [2 /*return*/, installer
                .default(extensions.map(function (name) { return installer[name]; }), forceDownload)
                .catch(console.log)];
    });
}); };
var createWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var RESOURCES_PATH, getAssetPath, _a, width, height, preload, nativeImage, dockIcon, menuBuilder;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!isDebug) return [3 /*break*/, 2];
                return [4 /*yield*/, installExtensions()];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                RESOURCES_PATH = electron_1.app.isPackaged
                    ? path_1.default.join(process.resourcesPath, 'assets')
                    : path_1.default.join(__dirname, '../../assets');
                getAssetPath = function () {
                    var paths = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        paths[_i] = arguments[_i];
                    }
                    return path_1.default.join.apply(path_1.default, __spreadArray([RESOURCES_PATH], paths, false));
                };
                _a = electron_1.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
                preload = electron_1.app.isPackaged
                    ? path_1.default.join(__dirname, 'preload.js')
                    : path_1.default.join(__dirname, '../../scripts/dll/preload.js');
                mainWindow = new electron_1.BrowserWindow({
                    show: false,
                    // frame: false,
                    titleBarStyle: 'hidden',
                    width: width - 100,
                    height: height - 100,
                    icon: getAssetPath('icon.png'),
                    // alwaysOnTop: true,
                    webPreferences: {
                        webviewTag: true,
                        nodeIntegration: true,
                        preload: preload,
                    },
                });
                nativeImage = require('electron').nativeImage;
                dockIcon = nativeImage.createFromPath(getAssetPath('icon.png'));
                (_b = electron_1.app.dock) === null || _b === void 0 ? void 0 : _b.setIcon(dockIcon); // todo: if electronStore preferences say to hide icon, hide icon with app.dock.setMenu(Menu.buildFromTemplate([])); maybe https://stackoverflow.com/questions/59668664/how-to-avoid-showing-a-dock-icon-while-my-electron-app-is-launching-on-macos
                electron_1.app.name = 'God Mode';
                mainWindow.loadURL((0, util_1.resolveHtmlPath)('index.html'));
                mainWindow.on('ready-to-show', function () {
                    if (!mainWindow) {
                        throw new Error('"mainWindow" is not defined');
                    }
                    if (process.env.START_MINIMIZED) {
                        mainWindow.minimize();
                    }
                    else {
                        mainWindow.show();
                    }
                });
                mainWindow.on('close', function (event) {
                    event.preventDefault();
                    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.destroy();
                });
                electron_1.app.on('activate', function () {
                    if (mainWindow === null)
                        createWindow();
                });
                menuBuilder = new menu_1.default(mainWindow);
                menuBuilder.buildMenu();
                // Remove this if your app does not use auto updates
                // eslint-disable-next-line
                new AppUpdater();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Add event listeners...
 */
electron_1.app.on('window-all-closed', function () {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('web-contents-created', function (event, contents) {
    // Enable context menu to debug webviews
    if (contents.getType() === 'webview') {
        (0, electron_context_menu_1.default)({
            window: contents,
            showInspectElement: true,
        });
    }
    var domainallowlist = [
        'https://accounts.google.com',
        'https://login.live.com',
    ];
    contents.setWindowOpenHandler(function (_a) {
        var url = _a.url;
        // return allow if url starts with domainallowlist member. for SSO
        if (domainallowlist.some(function (domain) { return url.startsWith(domain); })) {
            return { action: 'allow' };
        }
        // Open all external urls in the user's browser
        setImmediate(function () {
            electron_1.shell.openExternal(url);
        });
        return { action: 'deny' };
    });
});
electron_1.app.on('web-contents-created', function (e, contents) {
    if (contents.getType() == 'webview') {
        // contents.on("will-navigate", (event, url, frameName, disposition, options, additionalFeatures) => {
        //   console.log({frameName})
        //   if (frameName === 'my_popup') {
        //     // Open `url` in a new window...
        //     event.preventDefault()
        //     Object.assign(options, {
        //       parent: win,
        //       width: 500,
        //       height: 400
        //     })
        //     event.newGuest = new BrowserWindow(options)
        //   }
        // })
        // // set context menu in webview
        // contextMenu({
        //   window: contents,
        // });
        // we can't set the native app menu with "menubar" so need to manually register these events
        // register cmd+c/cmd+v events
        contents.on('before-input-event', function (event, input) {
            var control = input.control, meta = input.meta, key = input.key;
            if (!control && !meta)
                return;
            if (key === 'c')
                contents.copy();
            if (key === 'x')
                contents.cut();
            // if (key === "v") contents.paste(); // we will handle this manually
            if (key === 'a')
                contents.selectAll();
            if (key === 'z')
                contents.undo();
            if (key === 'y')
                contents.redo();
            if (key === 'q')
                electron_1.app.quit();
            if (key === 'r')
                contents.reload();
            if (key === 'h')
                contents.goBack();
            if (key === 'l')
                contents.goForward();
        });
    }
});
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', function (event, commandLine, workingDirectory, additionalData) {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
    });
    electron_1.app
        .whenReady()
        .then(function () {
        createWindow();
        electron_1.app.on('activate', function () {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null)
                createWindow();
        });
    })
        .catch(console.log);
}
/* ========================================================================== */
/* Global Shortcut Logic                                                      */
/* ========================================================================== */
/*
 * Fetch global shortcut from electron store, or default if none is set
 */
var quickOpenDefaultShortcut = store.get('quickOpenShortcut', 'CommandOrControl+Shift+G');
console.log(quickOpenDefaultShortcut);
console.log((0, utils_1.isValidShortcut)(quickOpenDefaultShortcut));
/*
 * Update the global shortcut to one provided
 */
function changeGlobalShortcut(newShortcut) {
    if (!newShortcut)
        return;
    if (!(0, utils_1.isValidShortcut)(newShortcut))
        return;
    store.set('quickOpenShortcut', newShortcut);
    electron_1.globalShortcut.register(newShortcut, quickOpen);
}
/*
 * Open and focus the main window
 */
function quickOpen() {
    if (mainWindow && !mainWindow.isDestroyed()) {
        if (mainWindow.isFocused()) {
            mainWindow.hide();
        }
        else {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.show();
            mainWindow.focus();
        }
    }
    else {
        createWindow();
    }
}
/*
 * Reply to renderer process with the global shortcut
 */
electron_1.ipcMain.handle('get-global-shortcut', function (event) {
    return store.get('quickOpenShortcut', 'CommandOrControl+Shift+G');
});
/*
 * Set the global shortcut to one provided
 */
electron_1.ipcMain.handle('set-global-shortcut', function (event, shortcut) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!shortcut)
            return [2 /*return*/, false];
        changeGlobalShortcut(shortcut);
        return [2 /*return*/, true];
    });
}); });
electron_1.app.on('ready', function () {
    /*
     * Register global shortcut on app ready
     */
    if ((0, utils_1.isValidShortcut)(quickOpenDefaultShortcut)) {
        store.set('quickOpenShortcut', quickOpenDefaultShortcut);
        electron_1.globalShortcut.register(quickOpenDefaultShortcut, quickOpen);
    }
    /*
     * Re-register global shortcut when it is changed in settings
     * and unregister the old one
     */
    store.onDidChange('quickOpenShortcut', function (newValue, oldValue) {
        if (newValue === oldValue)
            return;
        changeGlobalShortcut(newValue);
    });
});
electron_1.app.on('will-quit', function () {
    // Unregister the global shortcut
    electron_1.globalShortcut.unregisterAll();
});
