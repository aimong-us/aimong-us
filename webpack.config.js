const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: path.join(__dirname, 'client', 'index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client', 'build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client'),
    },
    proxy: {
      '/entries': 'http://localhost:3000',
      '/form': 'http://localhost:3000',
    },
  },
};
