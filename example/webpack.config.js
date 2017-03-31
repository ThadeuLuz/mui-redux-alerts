const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  resolve: { extensions: ['.js', '.jsx'] },
  devtool: 'eval',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', query: { compact: false } }],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};

module.exports = config;
