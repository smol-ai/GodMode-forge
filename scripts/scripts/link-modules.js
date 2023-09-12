"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var webpack_paths_1 = require("../configs/webpack.paths");
var srcNodeModulesPath = webpack_paths_1.default.srcNodeModulesPath;
var appNodeModulesPath = webpack_paths_1.default.appNodeModulesPath;
if (!fs_1.default.existsSync(srcNodeModulesPath) && fs_1.default.existsSync(appNodeModulesPath)) {
    fs_1.default.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
