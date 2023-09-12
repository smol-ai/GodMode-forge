"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var webpack_1 = require("webpack");
var webpack_merge_1 = require("webpack-merge");
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var webpack_config_base_1 = require("./webpack.config.base");
var webpack_paths_1 = require("./webpack.paths");
var check_node_env_1 = require("../scripts/check-node-env");
// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
    (0, check_node_env_1.default)('development');
}
var configuration = {
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'electron-preload',
    entry: path_1.default.join(webpack_paths_1.default.srcMainPath, 'preload.ts'),
    output: {
        path: webpack_paths_1.default.dllPath,
        filename: 'preload.js',
        library: {
            type: 'umd',
        },
    },
    plugins: [
        new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
        }),
        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         *
         * By default, use 'development' as NODE_ENV. This can be overriden with
         * 'staging', for example, by changing the ENV variables in the npm scripts
         */
        new webpack_1.default.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new webpack_1.default.LoaderOptionsPlugin({
            debug: true,
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
    watch: true,
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, configuration);
