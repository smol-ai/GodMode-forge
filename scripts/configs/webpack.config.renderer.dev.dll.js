"use strict";
/**
 * Builds the DLL for development electron renderer process
 */
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = require("webpack");
var path_1 = require("path");
var webpack_merge_1 = require("webpack-merge");
var webpack_config_base_1 = require("./webpack.config.base");
var webpack_paths_1 = require("./webpack.paths");
var package_json_1 = require("../../package.json");
var check_node_env_1 = require("../scripts/check-node-env");
(0, check_node_env_1.default)('development');
var dist = webpack_paths_1.default.dllPath;
var configuration = {
    context: webpack_paths_1.default.rootPath,
    devtool: 'eval',
    mode: 'development',
    target: 'electron-renderer',
    externals: ['fsevents', 'crypto-browserify'],
    /**
     * Use `module` from `webpack.config.renderer.dev.js`
     */
    module: require('./webpack.config.renderer.dev').default.module,
    entry: {
        renderer: Object.keys(package_json_1.dependencies || {}),
    },
    output: {
        path: dist,
        filename: '[name].dev.dll.js',
        library: {
            name: 'renderer',
            type: 'var',
        },
    },
    plugins: [
        new webpack_1.default.DllPlugin({
            path: path_1.default.join(dist, '[name].json'),
            name: '[name]',
        }),
        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
        new webpack_1.default.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new webpack_1.default.LoaderOptionsPlugin({
            debug: true,
            options: {
                context: webpack_paths_1.default.srcPath,
                output: {
                    path: webpack_paths_1.default.dllPath,
                },
            },
        }),
    ],
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, configuration);
