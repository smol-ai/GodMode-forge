"use strict";
/**
 * Webpack config for production electron main process
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var webpack_1 = require("webpack");
var webpack_merge_1 = require("webpack-merge");
var terser_webpack_plugin_1 = require("terser-webpack-plugin");
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var webpack_config_base_1 = require("./webpack.config.base");
var webpack_paths_1 = require("./webpack.paths");
var check_node_env_1 = require("../scripts/check-node-env");
var delete_source_maps_1 = require("../scripts/delete-source-maps");
(0, check_node_env_1.default)('production');
(0, delete_source_maps_1.default)();
console.log('webpackPaths.distMainPath', webpack_paths_1.default.distMainPath);
var configuration = {
    devtool: 'source-map',
    mode: 'production',
    target: 'electron-main',
    entry: {
        main: path_1.default.join(webpack_paths_1.default.srcMainPath, 'main.ts'),
        preload: path_1.default.join(webpack_paths_1.default.srcMainPath, 'preload.ts'),
    },
    output: {
        path: webpack_paths_1.default.distMainPath,
        filename: '[name].js',
        library: {
            type: 'umd',
        },
    },
    optimization: {
        minimizer: [
            new terser_webpack_plugin_1.default({
                parallel: true,
            }),
        ],
    },
    plugins: [
        new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
            analyzerPort: 8888,
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
            NODE_ENV: 'production',
            DEBUG_PROD: false,
            START_MINIMIZED: false,
        }),
        new webpack_1.default.DefinePlugin({
            'process.type': '"browser"',
        }),
    ],
    /**
     * Disables webpack processing of __dirname and __filename.
     * If you run the bundle in node.js it falls back to these values of node.js.
     * https://github.com/webpack/webpack/issues/2010
     */
    node: {
        __dirname: false,
        __filename: false,
    },
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, configuration);
