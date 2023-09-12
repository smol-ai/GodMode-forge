"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var rootPath = path.join(__dirname, '../..');
var dllPath = path.join(__dirname, '../dll');
var srcPath = path.join(rootPath, 'src');
var srcMainPath = path.join(srcPath, 'main');
var srcRendererPath = path.join(srcPath, 'renderer');
var releasePath = path.join(rootPath, 'release');
var appPath = path.join(releasePath, 'app');
var appPackagePath = path.join(appPath, 'package.json');
var appNodeModulesPath = path.join(appPath, 'node_modules');
var srcNodeModulesPath = path.join(srcPath, 'node_modules');
var distPath = path.join(appPath, 'dist');
var distMainPath = path.join(distPath, 'main');
var distRendererPath = path.join(distPath, 'renderer');
var buildPath = path.join(releasePath, 'build');
exports.default = {
    rootPath: rootPath,
    dllPath: dllPath,
    srcPath: srcPath,
    srcMainPath: srcMainPath,
    srcRendererPath: srcRendererPath,
    releasePath: releasePath,
    appPath: appPath,
    appPackagePath: appPackagePath,
    appNodeModulesPath: appNodeModulesPath,
    srcNodeModulesPath: srcNodeModulesPath,
    distPath: distPath,
    distMainPath: distMainPath,
    distRendererPath: distRendererPath,
    buildPath: buildPath,
};
