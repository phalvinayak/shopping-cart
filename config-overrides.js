/* config-overrides.js */
const path = require('path');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { alias, configPaths } = require('react-app-rewire-alias');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { addLess } = require('./webpack/webpack.utils');

module.exports = {
    webpack: function (config, env) {
        //disable create-react-app imports restriction: "outside of src directory"
        config.resolve.plugins = config.resolve.plugins.filter(
            (plugin) => !(plugin instanceof ModuleScopePlugin)
        );

        let isProd = env === 'production';
        let plugins = config.plugins;

        /** make webpack always create chunks for cache group
         *  @see https://v4.webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupenforce
         */

        config.optimization.splitChunks = {
            cacheGroups: {
                default: false,
                vendors: {
                    // enforce: true but, minSize 20000

                    // same as enforce: true
                    maxAsyncRequests: 10000,
                    maxInitialRequests: 10000,
                    minSize: 5000,
                    minChunks: 1,
                    ////////////////////////
                },
            },
        };

        // dont build runtime chunk
        config.optimization.runtimeChunk = false;

        // add less
        addLess(config, isProd);

        // build analyzer
        if (process.argv.includes('--report')) {
            plugins.push(new BundleAnalyzerPlugin());
        }

        // add aliases
        alias({
            ...configPaths('tsconfig-paths.json'),
            ...config.resolve.alias,
        })(config);

        // Set ignoreOrder flag to true for MiniCssExtractPlugin
        // The problem described here https://stackoverflow.com/a/67579319.
        // In our case it was related with using svg icons
        for (let i = 0; i < config.plugins.length; i++) {
            const p = config.plugins[i];
            if (
                !!p.constructor &&
                p.constructor.name === MiniCssExtractPlugin.name
            ) {
                const miniCssExtractOptions = {
                    ...p.options,
                    ignoreOrder: true,
                };
                config.plugins[i] = new MiniCssExtractPlugin(
                    miniCssExtractOptions
                );
                break;
            }
        }
        return config;
    },
};
