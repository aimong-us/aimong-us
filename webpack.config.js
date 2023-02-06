const path = require('path');

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
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
