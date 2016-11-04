var webpack = require('webpack');

var neat = require('node-neat').includePaths;
var sassPaths = require("node-neat").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV_API_PORT__: JSON.stringify(JSON.parse(process.env.API_PORT || '3000')),
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
});
//{ test: /\.js$/, exclude: /node_modules/, loader:'babel-loader' },
//
module.exports = {
    entry: [
      "./js/index.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js",
        publicPath: '/build/'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader:'babel-loader',
              query: {
                presets:['react', 'es2015', 'stage-2']
              }
            },
            { test: /\.css$/, loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
            { test: /\.scss$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap&' + sassPaths },
            { test: /\.jsx/, loader: 'jsx' }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ] };
