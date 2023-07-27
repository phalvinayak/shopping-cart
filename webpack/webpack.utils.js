const fs = require('fs');
const path = require('path');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('react-scripts/config/paths.js');
const postcssNormalize = require('postcss-normalize');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = !isEnvProduction;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function addLess(config, isProd) {
    const lessRegex = /\.(less)$/;

    const oneOfLoadersArr = config.module.rules[1].oneOf;
    const fileLoader = oneOfLoadersArr.slice(-1);
    const restLoaders = oneOfLoadersArr.slice(0, oneOfLoadersArr.length - 1);

    config.module.rules[1].oneOf = [
        ...restLoaders,
        {
            test: lessRegex,
            use: getStyleLoaders({
                importLoaders: 3,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: isProd
                    ? {
                          localIdentName: '[hash:base64:5]',
                      }
                    : {
                          getLocalIdent: getCSSModuleLocalIdent,
                      },
            }),
        },
        ...fileLoader,
    ];
}

// common function to get style loaders
function getStyleLoaders(cssOptions) {
    const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            // css is located in `static/css`, use '../../' to locate index.html folder
            // in production `paths.publicUrlOrPath` can be a relative path
            options: paths.publicUrlOrPath.startsWith('.')
                ? { publicPath: '../../' }
                : {},
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                            autoprefixer: {
                                flexbox: 'no-2009',
                            },
                            stage: 3,
                        }),
                        // TODO temporary fix
                        // https://github.com/vkalinichev/postcss-rtl/issues/76
                        // https://github.com/vkalinichev/postcss-rtl/pull/73

                        require('@mjhenkes/postcss-rtl')(),
                        // Adds PostCSS Normalize as the reset css with default options,
                        // so that it honors browserslist config in package.json
                        // which in turn let's users customize the target behavior as per their needs.
                        postcssNormalize(),
                    ],
                },
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
        },
    ].filter(Boolean);

    loaders.push(
        {
            loader: require.resolve('resolve-url-loader'),
            options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
                root: resolveApp('src'),
            },
        },
        {
            loader: require.resolve('less-loader'),
            options: {
                sourceMap: true,
                lessOptions: {
                    paths: [appDirectory],
                },
            },
        }
    );
    return loaders;
}

module.exports = { addLess };
