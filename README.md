Change import from webpack-manifest-plugin torspack-manifest-plugin.

### Before

```ts
//change the import from webpack-manifest-plugin to rspack-manifest-plugin

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  plugins: [new WebpackManifestPlugin(options)],
};
```

### After

```ts
const { RspackManifestPlugin } = require('rspack-manifest-plugin');

module.exports = {
  plugins: [new RspackManifestPlugin(options)],
};
```

