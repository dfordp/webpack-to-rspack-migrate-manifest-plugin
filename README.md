


## Example
This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

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

