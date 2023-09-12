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
var dialog_1 = require("./ui/dialog");
var react_1 = require("react");
var button_1 = require("./ui/button");
var react_2 = require("@headlessui/react");
var utils_1 = require("lib/utils");
function SettingsMenu(_a) {
    var _this = this;
    var open = _a.open, onClose = _a.onClose;
    var _b = (0, react_1.useState)([]), shortcut = _b[0], setShortcut = _b[1];
    var _c = (0, react_1.useState)([]), validShortcut = _c[0], setValidShortcut = _c[1];
    var _d = (0, react_1.useState)(false), isRecording = _d[0], setIsRecording = _d[1];
    var _e = (0, react_1.useState)(''), metaKey = _e[0], setMetaKey = _e[1];
    var _f = (0, react_1.useState)(false), openAtLogin = _f[0], setOpenAtLogin = _f[1];
    function classNames() {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        return classes.filter(Boolean).join(' ');
    }
    var settings = window.settings;
    var pressedKeys = new Set();
    function recordShortcut(event) {
        event.preventDefault();
        if (!isRecording)
            return;
        var workingShortcut = shortcut;
        var key = event.key;
        // const fetchPlatform = async () => {
        // 	const platform = await settings.getPlatform();
        // 	return platform;
        // };
        var pressedKey = utils_1.modifierKeys.has(key)
            ? (0, utils_1.convertModifierKey)(key)
            : (0, utils_1.convertKeyCode)(event.code);
        pressedKeys.add(pressedKey);
        workingShortcut = Array.from(pressedKeys);
        if ((0, utils_1.isValidShortcut)(workingShortcut)) {
            pressedKeys.clear();
            setIsRecording(false);
            setValidShortcut(__spreadArray([], workingShortcut, true));
        }
        setShortcut(__spreadArray([], workingShortcut, true));
    }
    function keyUp(event) {
        event.preventDefault();
        // if (!isRecording) return;
        var key = event.key;
        if (utils_1.modifierKeys.has(key)) {
            pressedKeys.delete((0, utils_1.convertModifierKey)(key));
        }
        else {
            pressedKeys.delete((0, utils_1.convertKeyCode)(event.code));
        }
        if (key === 'Escape')
            setIsRecording(false);
    }
    // Set the meta key on mount based on platform (cmd on mac, ctrl on windows)
    (0, react_1.useEffect)(function () {
        var fetchPlatform = function () { return __awaiter(_this, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, settings.getPlatform()];
                    case 1:
                        platform = _a.sent();
                        setMetaKey(platform === 'darwin' ? 'CmdOrCtrl' : 'Control');
                        return [2 /*return*/];
                }
            });
        }); };
        if ((0, utils_1.isValidShortcut)(shortcut))
            fetchPlatform();
    }, []);
    // Set the shortcut from the main process on mount
    (0, react_1.useEffect)(function () {
        var displayShortcut = function () { return __awaiter(_this, void 0, void 0, function () {
            var initialShortcut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, settings.getGlobalShortcut()];
                    case 1:
                        initialShortcut = _a.sent();
                        console.debug('initialShortcut', initialShortcut);
                        setShortcut(initialShortcut === null || initialShortcut === void 0 ? void 0 : initialShortcut.split('+'));
                        return [2 /*return*/];
                }
            });
        }); };
        displayShortcut();
    }, []);
    // Whenever shortcut is updated, update it in the electron store in the main process via IPC
    (0, react_1.useEffect)(function () {
        if (!(0, utils_1.isValidShortcut)(validShortcut))
            return;
        var updateShortcut = function (shortcut) { return __awaiter(_this, void 0, void 0, function () {
            var newShortcut, sc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newShortcut = shortcut.join('+');
                        return [4 /*yield*/, settings.setGlobalShortcut(newShortcut)];
                    case 1:
                        sc = _a.sent();
                        setValidShortcut([]);
                        return [2 /*return*/];
                }
            });
        }); };
        updateShortcut(validShortcut);
    }, [validShortcut]);
    // Turn on key listeners when recording shortcuts
    (0, react_1.useEffect)(function () {
        if (isRecording && validShortcut.length === 0) {
            console.log('inside recording');
            window.addEventListener('keydown', recordShortcut);
            window.addEventListener('keyup', keyUp);
        }
        else {
            console.log('inside not recording');
            window.removeEventListener('keydown', recordShortcut);
            window.removeEventListener('keyup', keyUp);
        }
        return function () {
            window.removeEventListener('keydown', recordShortcut);
            window.removeEventListener('keyup', keyUp);
        };
    }, [isRecording, validShortcut]);
    // Turn off recording when the dialog is closed
    (0, react_1.useEffect)(function () {
        if (!open)
            setIsRecording(false);
    }, [open]);
    (0, react_1.useEffect)(function () {
        var fetchOpenAtLogin = function () { return __awaiter(_this, void 0, void 0, function () {
            var isOpen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, settings.getOpenAtLogin()];
                    case 1:
                        isOpen = _a.sent();
                        setOpenAtLogin(isOpen);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchOpenAtLogin();
    }, []);
    (0, react_1.useEffect)(function () {
        openAtLogin
            ? window.electron.browserWindow.enableOpenAtLogin()
            : window.electron.browserWindow.disableOpenAtLogin();
    }, [openAtLogin]);
    return (<dialog_1.Dialog open={open} onOpenChange={onClose}>
			<dialog_1.DialogContent className="bg-white">
				<dialog_1.DialogHeader>
					<dialog_1.DialogTitle>Settings</dialog_1.DialogTitle>
				</dialog_1.DialogHeader>
				<react_2.Switch.Group as="div" className="flex items-center justify-between">
					<span className="flex flex-col flex-grow">
						<react_2.Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
							Automatically Open GodMode at Login
						</react_2.Switch.Label>
					</span>
					<react_2.Switch checked={openAtLogin} onChange={setOpenAtLogin} className={classNames(openAtLogin ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none')}>
						<span aria-hidden="true" className={classNames(openAtLogin ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out')}/>
					</react_2.Switch>
				</react_2.Switch.Group>
				<span className="flex flex-col flex-grow">
					<div as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
						Change Shortcut
					</div>
				</span>

				<div id="accelerator-container" className="flex flex-row justify-center">
					{shortcut === null || shortcut === void 0 ? void 0 : shortcut.map(function (key, index) { return (<div key={index} className="flex items-center">
							<div className="px-2 py-1 text-xs bg-gray-200 rounded-md dark:bg-gray:700">
								{key}
							</div>
							<div className="mx-2 text-sm">
								{index < shortcut.length - 1 && '+'}
							</div>
						</div>); })}
				</div>
				{isRecording ? (<button_1.Button onClick={function () { return setIsRecording(!isRecording); }} variant="outline" className="text-red-500">
						Recording...
					</button_1.Button>) : (<button_1.Button onClick={function () { return setIsRecording(!isRecording); }} variant="outline" className="">
						Record shortcut
					</button_1.Button>)}
			</dialog_1.DialogContent>
		</dialog_1.Dialog>);
}
exports.default = SettingsMenu;
