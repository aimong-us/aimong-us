const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: path.join(__dirname, 'client', 'index.js'),
    login: path.join(__dirname, 'client', 'login.js'),
    signup: path.join(__dirname, 'client', 'signup.js'),
  },
  output: {
    filename: '[name].bundle.js',
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
      // MAKE SURE THIS SASS STUFF WORKS
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'index.html'),
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'login.html'),
      chunks: ['login'],
      filename: 'login.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'signup.html'),
      chunks: ['signup'],
      filename: 'signup.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client'),
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
