const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    watchOptions: {
        poll: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/react', "@babel/preset-env"]
            }
          },
          {
            test: /\.scss$/,
            use: [
              process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
              "css-loader", 
              "sass-loader"
            ]
        }
        ]
      }
};
module.exports = config;