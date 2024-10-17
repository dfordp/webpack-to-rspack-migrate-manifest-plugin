//change the import from webpack-manifest-plugin to rspack-manifest-plugin

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  plugins: [new WebpackManifestPlugin(options)],
};