"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveHtmlPath = void 0;
/* eslint import/prefer-default-export: off */
var url_1 = require("url");
var path_1 = require("path");
function resolveHtmlPath(htmlFileName) {
    if (process.env.NODE_ENV === 'development') {
        var port = process.env.PORT || 1212;
        var url = new url_1.URL("http://localhost:".concat(port));
        url.pathname = htmlFileName;
        return url.href;
    }
    return "file://".concat(path_1.default.resolve(__dirname, '../renderer/', htmlFileName));
}
exports.resolveHtmlPath = resolveHtmlPath;
