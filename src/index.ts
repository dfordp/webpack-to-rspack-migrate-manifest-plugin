export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Handle destructured require statement
  root.find(j.VariableDeclarator, {
      id: { type: 'ObjectPattern' },
      init: {
          callee: { name: 'require' },
          arguments: [{ value: 'webpack-manifest-plugin' }],
      },
  }).forEach((path) => {
      const properties = path.node.id.properties;
      properties.forEach((prop) => {
          if (
              j.Identifier.check(prop.key) &&
              prop.key.name === 'WebpackManifestPlugin'
          ) {
              prop.key.name = 'RspackManifestPlugin';
              dirtyFlag = true;
          }
      });
      if (j.Literal.check(path.node.init.arguments[0])) {
          path.node.init.arguments[0].value = 'rspack-manifest-plugin';
          dirtyFlag = true;
      }
  });

  // Handle member expression require statement
  root.find(j.VariableDeclarator, {
      id: { type: 'Identifier' },
      init: {
          type: 'MemberExpression',
          object: {
              callee: { name: 'require' },
              arguments: [{ value: 'webpack-manifest-plugin' }],
          },
          property: { name: 'WebpackManifestPlugin' },
      },
  }).forEach((path) => {
      // Transform to destructured require statement with shorthand property
      path.node.id = j.objectPattern([
          j.property.from({
              kind: 'init',
              key: j.identifier('RspackManifestPlugin'),
              value: j.identifier('RspackManifestPlugin'),
              shorthand: true,
          }),
      ]);
      path.node.init = j.callExpression(j.identifier('require'), [
          j.literal('rspack-manifest-plugin'),
      ]);
      dirtyFlag = true;
  });

  // Find and replace instantiation in plugins array
  root.find(j.NewExpression, {
      callee: { name: 'WebpackManifestPlugin' },
  }).forEach((path) => {
      path.node.callee.name = 'RspackManifestPlugin';
      dirtyFlag = true;
  });

  return dirtyFlag ? root.toSource() : undefined;
}

export const parser = 'tsx';
