"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamChatResponse = void 0;
var electron_1 = require("electron");
function streamChatResponse(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var win;
        var _this = this;
        return __generator(this, function (_a) {
            win = new electron_1.BrowserWindow({
                // show: true,
                show: false,
                // titleBarStyle: 'hidden',
                // width: 800,
                // height: 600,
                // webPreferences: {
                // 	webviewTag: true,
                // 	nodeIntegration: true,
                // },
            });
            win.loadURL(opts.provider.url);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    win.webContents.on('dom-ready', function () { return __awaiter(_this, void 0, void 0, function () {
                        var err_1, script, lastResponseHTML, secondLastResponseHTML, responseHTML, responseText;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    // check if logged in (and inputElement exists)
                                    return [4 /*yield*/, win.webContents.executeJavaScript("{".concat(opts.provider.codeForInputElement, "}"))];
                                case 1:
                                    // check if logged in (and inputElement exists)
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    console.error('input element doesnt exist: ', opts.provider.codeForInputElement);
                                    return [2 /*return*/, reject(err_1)];
                                case 3: return [4 /*yield*/, timeout(500)];
                                case 4:
                                    _a.sent();
                                    script = "{\n\t\t\t\t".concat(opts.provider.codeForInputElement, "\n        ").concat(opts.provider.codeForSetInputElementValue(opts.prompt), "\n        ").concat(opts.provider.codeForClickingSubmit, "\n\t\t\t}");
                                    return [4 /*yield*/, win.webContents.executeJavaScript(script)];
                                case 5:
                                    _a.sent();
                                    console.log('script', script);
                                    lastResponseHTML = null;
                                    secondLastResponseHTML = null;
                                    console.log('looping');
                                    // Loop until our condition is met
                                    return [4 /*yield*/, timeout(300)];
                                case 6:
                                    // Loop until our condition is met
                                    _a.sent();
                                    _a.label = 7;
                                case 7:
                                    if (!true) return [3 /*break*/, 11];
                                    return [4 /*yield*/, timeout(300)];
                                case 8:
                                    _a.sent();
                                    return [4 /*yield*/, win.webContents.executeJavaScript("".concat(opts.provider.codeForExtractingResponse, ".innerHTML"))];
                                case 9:
                                    responseHTML = _a.sent();
                                    return [4 /*yield*/, win.webContents.executeJavaScript("".concat(opts.provider.codeForExtractingResponse, ".innerText"))];
                                case 10:
                                    responseText = _a.sent();
                                    console.log({ responseHTML: responseHTML, secondLastResponseHTML: secondLastResponseHTML });
                                    // If responseHTML hasn't changed for 2 invocations, break
                                    if (responseHTML === lastResponseHTML &&
                                        responseHTML === secondLastResponseHTML) {
                                        console.log('prompting');
                                        return [3 /*break*/, 11];
                                    }
                                    // Shift our stored responses for the next loop iteration
                                    secondLastResponseHTML = lastResponseHTML;
                                    lastResponseHTML = responseHTML;
                                    console.log('sendFn', responseText);
                                    opts.sendFn(responseHTML, responseText); // stream incomplete responses back
                                    return [3 /*break*/, 7];
                                case 11:
                                    console.log('closing');
                                    win.close();
                                    return [2 /*return*/, resolve({ responseHTML: responseHTML, responseText: responseText })];
                            }
                        });
                    }); });
                })];
        });
    });
}
exports.streamChatResponse = streamChatResponse;
// thanks claude
function timeout(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
