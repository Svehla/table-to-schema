var webpack = require("webpack");
var path = require("path");

process.env.NODE_ENV = true;

var production = false //JSON.parse(process.env.PROD_ENV );


module.exports = {
  entry: {
    app: production ? ["./lib/table-to-schema.js"] : ["./example/main.js"]
  },
  devtool: 'source-map',
  output: {
    path: production ? path.resolve(__dirname, "dist") : path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: production ? "table-to-schema.js": "bundle.js"
  },
  plugins: production ? [
    new webpack.optimize.UglifyJsPlugin({
     compress: { warnings: false },
     //minimize: true
   })
  ] : [],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devServer: { inline: true }
};
