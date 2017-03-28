const webpack = require('webpack');

const config = {
  context: __dirname,
  entry: {
    example: './example/Index.jsx'
  },
  output: {
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limi1t=2500' },
      {
        test: /\.scss|\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]-[local]--[hash:base64:8]!postcss-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('postcss-cssnext')
        ]
      }
    })
  ],
  devServer: {
    port: 8080
  },
  devtool: 'source-map'
};


module.exports = config;
