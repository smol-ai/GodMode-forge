"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
require("webpack-dev-server");
var path_1 = require("path");
var fs_1 = require("fs");
var webpack_1 = require("webpack");
var html_webpack_plugin_1 = require("html-webpack-plugin");
var chalk_1 = require("chalk");
var webpack_merge_1 = require("webpack-merge");
var child_process_1 = require("child_process");
var react_refresh_webpack_plugin_1 = require("@pmmmwh/react-refresh-webpack-plugin");
var webpack_config_base_1 = require("./webpack.config.base");
var webpack_paths_1 = require("./webpack.paths");
var check_node_env_1 = require("../scripts/check-node-env");
// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
    (0, check_node_env_1.default)('development');
}
var port = process.env.PORT || 1212;
var manifest = path_1.default.resolve(webpack_paths_1.default.dllPath, 'renderer.json');
var skipDLLs = ((_a = module.parent) === null || _a === void 0 ? void 0 : _a.filename.includes('webpack.config.renderer.dev.dll')) ||
    ((_b = module.parent) === null || _b === void 0 ? void 0 : _b.filename.includes('webpack.config.eslint'));
/**
 * Warn if the DLL is not built
 */
if (!skipDLLs &&
    !(fs_1.default.existsSync(webpack_paths_1.default.dllPath) && fs_1.default.existsSync(manifest))) {
    console.log(chalk_1.default.black.bgYellow.bold('The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'));
    (0, child_process_1.execSync)('npm run postinstall');
}
var configuration = {
    devtool: 'inline-source-map',
    mode: 'development',
    target: ['web', 'electron-renderer'],
    entry: [
        "webpack-dev-server/client?http://localhost:".concat(port, "/dist"),
        'webpack/hot/only-dev-server',
        path_1.default.join(webpack_paths_1.default.srcRendererPath, 'index.tsx'),
    ],
    output: {
        path: webpack_paths_1.default.distRendererPath,
        publicPath: '/',
        filename: 'renderer.dev.js',
        library: {
            type: 'umd',
        },
    },
    module: {
        rules: [
            {
                test: /\.s?(c|a)ss$/,
                use: [
                    'style-loader',
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
                test: /\.s?css$/,
                use: [
                    'style-loader',
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
    plugins: __spreadArray(__spreadArray([], (skipDLLs
        ? []
        : [
            new webpack_1.default.DllReferencePlugin({
                context: webpack_paths_1.default.dllPath,
                manifest: require(manifest),
                sourceType: 'var',
            }),
        ]), true), [
        new webpack_1.default.NoEmitOnErrorsPlugin(),
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
        new react_refresh_webpack_plugin_1.default(),
        new html_webpack_plugin_1.default({
            filename: path_1.default.join('index.html'),
            template: path_1.default.join(webpack_paths_1.default.srcRendererPath, 'index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            isBrowser: false,
            env: process.env.NODE_ENV,
            isDevelopment: process.env.NODE_ENV !== 'production',
            nodeModules: webpack_paths_1.default.appNodeModulesPath,
        }),
    ], false),
    node: {
        __dirname: false,
        __filename: false,
    },
    devServer: {
        port: port,
        compress: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        static: {
            publicPath: '/',
        },
        historyApiFallback: {
            verbose: true,
        },
        setupMiddlewares: function (middlewares) {
            console.log('Starting preload.js builder...');
            var preloadProcess = (0, child_process_1.spawn)('npm', ['run', 'start:preload'], {
                shell: true,
                stdio: 'inherit',
            })
                .on('close', function (code) { return process.exit(code); })
                .on('error', function (spawnError) { return console.error(spawnError); });
            console.log('Starting Main Process...');
            var args = ['run', 'start:main'];
            if (process.env.MAIN_ARGS) {
                args = args.concat(__spreadArray(['--'], process.env.MAIN_ARGS.matchAll(/"[^"]+"|[^\s"]+/g), true).flat());
            }
            (0, child_process_1.spawn)('npm', args, {
                shell: true,
                stdio: 'inherit',
            })
                .on('close', function (code) {
                preloadProcess.kill();
                process.exit(code);
            })
                .on('error', function (spawnError) { return console.error(spawnError); });
            return middlewares;
        },
    },
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, configuration);
