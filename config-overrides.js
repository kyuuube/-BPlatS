const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy, disableEsLint, addWebpackAlias} = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
module.exports = override(
    addWebpackAlias({
        'react-dom': '@hot-loader/react-dom'
    }),
    (config, env) => {
        config = rewireReactHotLoader(config, env);
        return config;
    },
    addDecoratorsLegacy(),
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: {'@component-background': '#001223'},
    }),
);
