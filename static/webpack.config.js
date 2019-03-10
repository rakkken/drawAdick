const webpack = require('webpack');
const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    watchOptions: {
        poll: true
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/react', "@babel/preset-env"]
            }
          }
        ]
      }
};
module.exports = config;