"use strict";
/**
 * Build config for electron renderer process
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var webpack_1 = require("webpack");
var html_webpack_plugin_1 = require("html-webpack-plugin");
var mini_css_extract_plugin_1 = require("mini-css-extract-plugin");
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var css_minimizer_webpack_plugin_1 = require("css-minimizer-webpack-plugin");
var webpack_merge_1 = require("webpack-merge");
var terser_webpack_plugin_1 = require("terser-webpack-plugin");
var webpack_config_base_1 = require("./webpack.config.base");
var webpack_paths_1 = require("./webpack.paths");
var check_node_env_1 = require("../scripts/check-node-env");
var delete_source_maps_1 = require("../scripts/delete-source-maps");
(0, check_node_env_1.default)('production');
(0, delete_source_maps_1.default)();
var configuration = {
    devtool: 'source-map',
    mode: 'production',
    target: ['web', 'electron-renderer'],
    entry: [path_1.default.join(webpack_paths_1.default.srcRendererPath, 'index.tsx')],
    output: {
        path: webpack_paths_1.default.distRendererPath,
        publicPath: './',
        filename: 'renderer.js',
        library: {
            type: 'umd',
        },
    },
    module: {
        rules: [
            {
                test: /\.s?(a|c)ss$/,
                use: [
                    mini_css_extract_plugin_1.default.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.s?(c|a)ss$/,
            },
            {
                test: /\.s?(a|c)ss$/,
                use: [
                    mini_css_extract_plugin_1.default.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('tailwindcss'), require('autoprefixer')],
                            },
                        },
                    },
                ],
                exclude: /\.module\.s?(c|a)ss$/,
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // Images
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // SVG
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            prettier: false,
                            svgo: false,
                            svgoConfig: {
                                plugins: [{ removeViewBox: false }],
                            },
                            titleProp: true,
                            ref: true,
                        },
                    },
                    'file-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new terser_webpack_plugin_1.default(), new css_minimizer_webpack_plugin_1.default()],
    },
    plugins: [
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
        }),
        new mini_css_extract_plugin_1.default({
            filename: 'style.css',
        }),
        new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
            analyzerPort: 8889,
        }),
        new html_webpack_plugin_1.default({
            filename: 'index.html',
            template: path_1.default.join(webpack_paths_1.default.srcRendererPath, 'index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            isBrowser: false,
            isDevelopment: false,
        }),
        new webpack_1.default.DefinePlugin({
            'process.type': '"renderer"',
        }),
    ],
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, configuration);
