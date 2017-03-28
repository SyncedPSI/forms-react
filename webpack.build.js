const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

config.entry = {
  'share-fixed': './src/ShareFixed.jsx'
};

config.output.path = path.join(__dirname, 'build');
config.output.libraryTarget = 'umd';
config.externals = {
  react: {
    root: 'React',
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom'
  }
};

config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
]);

module.exports = config;
