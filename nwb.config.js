module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'reactSmtcUiUtils',
            externals: {
                react: 'React',
                'react-router': 'ReactRouter',
                'json-loader': 'json-loader',
                'semantic-ui-css':'semantic-ui-css',
            }
        }
    }
}
