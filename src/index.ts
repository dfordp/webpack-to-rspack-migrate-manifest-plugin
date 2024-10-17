export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find and replace require statement
  root.find(j.VariableDeclarator, {
    id: { type: 'ObjectPattern' },
    init: { callee: { name: 'require' }, arguments: [{ value: 'webpack-manifest-plugin' }] }
  }).forEach(path => {
    const properties = path.node.id.properties;
    properties.forEach(prop => {
      if (j.Identifier.check(prop.key) && prop.key.name === 'WebpackManifestPlugin') {
        prop.key.name = 'RspackManifestPlugin';
        dirtyFlag = true;
      }
    });
    if (j.Literal.check(path.node.init.arguments[0])) {
      path.node.init.arguments[0].value = 'rspack-manifest-plugin';
      dirtyFlag = true;
    }
  });

  // Find and replace instantiation in plugins array
  root.find(j.NewExpression, {
    callee: { name: 'WebpackManifestPlugin' }
  }).forEach(path => {
    path.node.callee.name = 'RspackManifestPlugin';
    dirtyFlag = true;
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";