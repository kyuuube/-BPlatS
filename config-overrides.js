const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy, disableEsLint, addWebpackAlias} = require('customize-cra');
module.exports = override(
    addWebpackAlias({
        'react-dom': '@hot-loader/react-dom'
    }),
    addDecoratorsLegacy(),
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: {'@primary-color': '#a51411'},
    }),
);
