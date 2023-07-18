const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, argv) => {
  const { mode } = argv;
  const isDevelopment = mode === 'development';

  const config = {
    entry: {
      main: './src/js/index.js',
      worker: './src/js/worker/index.js',
      demo: './src/js/demo/index.js',
    },
    mode,
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin', 
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      })
    ],
    optimization: isDevelopment ? undefined :{
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  };

  return config;
}