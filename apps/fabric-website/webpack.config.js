module.exports = function(env) {
  const path = require('path');
  const resources = require('../../scripts/webpack/webpack-resources');
  const version = require('./package.json').version;
  const isDogfoodArg = env && !env.production;
  const isProductionArg = env && env.production;
  const now = Date.now();

  // Production defaults
  let minFileNamePart = '';
  let entryPointName = 'fabric-sitev5';
  let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

  // Dogfood overrides
  if (isDogfoodArg) {
    publicPath = 'https://static2df.sharepointonline.com/files/fabric/fabric-website/dist/';
    entryPointName = 'fabric-sitev5-df';
  } else if (!isProductionArg) {
    publicPath = '/dist/';
  } else {
    minFileNamePart = '.min';
  }

  return resources.createConfig(
    entryPointName,
    isProductionArg,
    {
      entry: {
        [entryPointName]: './lib/root.js'
      },

      output: {
        publicPath: publicPath,
        chunkFilename: `${entryPointName}-${version}-[name]-${now}${minFileNamePart}.js`
      },

      externals: [
        {
          react: 'React'
        },
        {
          'react-dom': 'ReactDOM'
        }
      ],

      resolve: {
        alias: {
          'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
          'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
          '@uifabric/api-docs/lib': path.join(__dirname, 'node_modules/@uifabric/api-docs/lib')
        }
      }
    },
    isProductionArg /* only production */
  );
};
