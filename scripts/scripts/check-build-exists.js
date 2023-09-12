"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Check if the renderer and main bundles are built
var path_1 = require("path");
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var webpack_paths_1 = require("../configs/webpack.paths");
var mainPath = path_1.default.join(webpack_paths_1.default.distMainPath, 'main.js');
var rendererPath = path_1.default.join(webpack_paths_1.default.distRendererPath, 'renderer.js');
if (!fs_1.default.existsSync(mainPath)) {
    throw new Error(chalk_1.default.whiteBright.bgRed.bold('The main process is not built yet. Build it by running "npm run build:main"'));
}
if (!fs_1.default.existsSync(rendererPath)) {
    throw new Error(chalk_1.default.whiteBright.bgRed.bold('The renderer process is not built yet. Build it by running "npm run build:renderer"'));
}
