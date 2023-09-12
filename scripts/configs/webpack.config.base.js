"use strict";
/**
 * Base webpack config used across other specific configs
 */
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
var webpack = require("webpack");
var tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
var webpack_paths_1 = require("./webpack.paths");
var package_json_1 = require("../../release/app/package.json");
var configuration = {
    externals: __spreadArray([], Object.keys(package_json_1.dependencies || {}), true),
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // Remove this line to enable type checking in webpack builds
                        transpileOnly: true,
                        compilerOptions: {
                            module: 'esnext',
                        },
                    },
                },
            },
        ],
    },
    output: {
        path: webpack_paths_1.default.srcPath,
        // https://github.com/webpack/webpack/issues/1114
        library: {
            type: 'commonjs2',
        },
    },
    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [webpack_paths_1.default.srcPath, 'node_modules'],
        // There is no need to add aliases here, the paths in tsconfig get mirrored
        plugins: [new tsconfig_paths_webpack_plugin_1.default()],
    },
    plugins: [
        new webpack.default.EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
    ],
};
exports.default = configuration;
