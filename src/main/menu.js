"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function openSettingsWindow() {
    electron_1.ipcRenderer.send('open-settings-window');
}
var MenuBuilder = /** @class */ (function () {
    function MenuBuilder(mainWindow) {
        this.mainWindow = mainWindow;
    }
    MenuBuilder.prototype.buildMenu = function () {
        if (process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true') {
            this.setupDevelopmentEnvironment();
        }
        var template = process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : this.buildDefaultTemplate();
        var menu = electron_1.Menu.buildFromTemplate(template);
        electron_1.Menu.setApplicationMenu(menu);
        return menu;
    };
    MenuBuilder.prototype.setupDevelopmentEnvironment = function () {
        var _this = this;
        this.mainWindow.webContents.on('context-menu', function (_, props) {
            var x = props.x, y = props.y;
            electron_1.Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: function () {
                        _this.mainWindow.webContents.inspectElement(x, y);
                    },
                },
            ]).popup({ window: _this.mainWindow });
        });
    };
    MenuBuilder.prototype.buildDarwinTemplate = function () {
        var _this = this;
        var subMenuAbout = {
            label: 'God Mode',
            submenu: [
                {
                    label: 'About God Mode',
                    selector: 'orderFrontStandardAboutPanel:',
                },
                { type: 'separator' },
                { label: 'Services', submenu: [] },
                { type: 'separator' },
                {
                    label: 'Hide God Mode',
                    accelerator: 'Command+H',
                    selector: 'hide:',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:',
                },
                { label: 'Show All', selector: 'unhideAllApplications:' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function () {
                        electron_1.app.quit();
                    },
                },
            ],
        };
        var subMenuEdit = {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
                { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
                { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
                { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:',
                },
            ],
        };
        var subMenuViewDev = {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: function () {
                        _this.mainWindow.webContents.reload();
                    },
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: function () {
                        _this.mainWindow.setFullScreen(!_this.mainWindow.isFullScreen());
                    },
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: function () {
                        _this.mainWindow.webContents.toggleDevTools();
                    },
                },
            ],
        };
        var subMenuViewProd = {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: function () {
                        _this.mainWindow.setFullScreen(!_this.mainWindow.isFullScreen());
                    },
                },
            ],
        };
        var subMenuWindow = {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:',
                },
                { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
                { type: 'separator' },
                { label: 'Bring All to Front', selector: 'arrangeInFront:' },
            ],
        };
        var subMenuHelp = {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click: function () {
                        electron_1.shell.openExternal('https://electronjs.org');
                    },
                },
                {
                    label: 'Documentation',
                    click: function () {
                        electron_1.shell.openExternal('https://github.com/electron/electron/tree/main/docs#readme');
                    },
                },
                {
                    label: 'Community Discussions',
                    click: function () {
                        electron_1.shell.openExternal('https://www.electronjs.org/community');
                    },
                },
                {
                    label: 'Search Issues',
                    click: function () {
                        electron_1.shell.openExternal('https://github.com/electron/electron/issues');
                    },
                },
            ],
        };
        var subMenuView = process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
            ? subMenuViewDev
            : subMenuViewProd;
        return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
    };
    MenuBuilder.prototype.buildDefaultTemplate = function () {
        var _this = this;
        var templateDefault = [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O',
                    },
                    {
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click: function () {
                            _this.mainWindow.close();
                        },
                    },
                ],
            },
            {
                label: '&View',
                submenu: process.env.NODE_ENV === 'development' ||
                    process.env.DEBUG_PROD === 'true'
                    ? [
                        {
                            label: '&Reload',
                            accelerator: 'Ctrl+R',
                            click: function () {
                                _this.mainWindow.webContents.reload();
                            },
                        },
                        {
                            label: 'Toggle &Full Screen',
                            accelerator: 'F11',
                            click: function () {
                                _this.mainWindow.setFullScreen(!_this.mainWindow.isFullScreen());
                            },
                        },
                        {
                            label: 'Toggle &Developer Tools',
                            accelerator: 'Alt+Ctrl+I',
                            click: function () {
                                _this.mainWindow.webContents.toggleDevTools();
                            },
                        },
                    ]
                    : [
                        {
                            label: 'Toggle &Full Screen',
                            accelerator: 'F11',
                            click: function () {
                                _this.mainWindow.setFullScreen(!_this.mainWindow.isFullScreen());
                            },
                        },
                    ],
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Learn More',
                        click: function () {
                            electron_1.shell.openExternal('https://electronjs.org');
                        },
                    },
                    {
                        label: 'Documentation',
                        click: function () {
                            electron_1.shell.openExternal('https://github.com/electron/electron/tree/main/docs#readme');
                        },
                    },
                    {
                        label: 'Community Discussions',
                        click: function () {
                            electron_1.shell.openExternal('https://www.electronjs.org/community');
                        },
                    },
                    {
                        label: 'Search Issues',
                        click: function () {
                            electron_1.shell.openExternal('https://github.com/electron/electron/issues');
                        },
                    },
                ],
            },
        ];
        return templateDefault;
    };
    return MenuBuilder;
}());
exports.default = MenuBuilder;
