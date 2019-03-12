const path = require('path');
const merge = require('webpack-merge');

module.exports = function override(config, env) {
  return merge(config, {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      }
    },
  });
};
