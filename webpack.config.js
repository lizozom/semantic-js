const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    worker: './src/js/worker/index.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html',
  //   }),
  // ],
};
