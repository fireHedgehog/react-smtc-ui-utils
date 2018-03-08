module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'reactSmtcUiUtils',
      externals: {
        react: 'React',
        'react-router': 'ReactRouter'
      }
    }
  }
}
