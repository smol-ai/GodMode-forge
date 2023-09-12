"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPlatform = exports.CmdOrCtrlKey = exports.isValidShortcut = exports.convertModifierKey = exports.modifierKeys = exports.convertKeyCode = exports.cn = exports.getEnabledProviders = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function getEnabledProviders(allProviders) {
    return allProviders.filter(function (provider) { return provider.isEnabled(); });
}
exports.getEnabledProviders = getEnabledProviders;
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function convertKeyCode(code) {
    return code
        .toUpperCase()
        .replace('KEY', '')
        .replace('DIGIT', '')
        .replace('NUMPAD', 'NUM')
        .replace('COMMA', ',');
}
exports.convertKeyCode = convertKeyCode;
exports.modifierKeys = new Set([
    'Command',
    'Control',
    'Cmd',
    'Ctrl',
    'CmdOrCtrl',
    'CommandOrControl',
    'Alt',
    'Option',
    'AltGr',
    'Shift',
    'Super',
    'Meta',
]);
function convertModifierKey(key) {
    var shortcuts = {
        Command: exports.CmdOrCtrlKey,
        Cmd: exports.CmdOrCtrlKey,
        CmdOrCtrl: exports.CmdOrCtrlKey,
        CommandOrControl: exports.CmdOrCtrlKey,
        Control: 'Ctrl',
        Ctrl: 'Ctrl',
        Alt: 'Alt',
        Option: 'Option',
        AltGr: 'AltGr',
        Shift: 'Shift',
        Super: 'CmdOrCtrl',
        Meta: 'CmdOrCtrl',
    };
    var result = shortcuts[key] || key;
    return result;
}
exports.convertModifierKey = convertModifierKey;
// Iterate through shortcut array and confirm there is at least 1 modifier
// and no more than 1 non-modifier key
function isValidShortcut() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    // Track the count of modifier and non-modifier keys
    var modifierCount = 0;
    var nonModifierCount = 0;
    var shiftCount = 0; // Track the count of shift keys
    var shortcut = keys.flatMap(function (value) {
        return typeof value === 'string' ? value.split('+') : value.flat();
    });
    shortcut.forEach(function (key) {
        if (key === 'Shift') {
            shiftCount++;
        }
        else if (exports.modifierKeys.has(key)) {
            modifierCount++;
        }
        else {
            nonModifierCount++;
        }
    });
    return modifierCount >= 1 && nonModifierCount === 1; // Modify this based on the specific rules for a valid shortcut
}
exports.isValidShortcut = isValidShortcut;
// This is here to avoid a circular dependency in constants.ts
exports.CmdOrCtrlKey = getCurrentPlatform() === 'mac' ? 'Cmd' : 'Ctrl';
function getCurrentPlatform() {
    var platform = (typeof process !== 'undefined' ? process.platform : navigator.platform) // navigator.platform is technically deprecated, but still works
        .toLowerCase();
    if (['darwin', 'macintel'].includes(platform)) {
        return 'mac';
    }
    else if (platform === 'win32') {
        return 'win';
    }
    else {
        return 'linux';
    }
}
exports.getCurrentPlatform = getCurrentPlatform;
