const path = require("path");
const SizePlugin = require("size-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/stimulus-flatpickr.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "stimulus-flatpickr",
    libraryTarget: "umd",
    filename: "stimulus-flatpickr.umd.js"
  },
  externals: {
    stimulus: {
      commonjs: "stimulus",
      commonjs2: "stimulus",
      amd: "stimulus",
      root: "Stimulus"
    },
    flatpickr: {
      commonjs: "flatpickr",
      commonjs2: "flatpickr",
      amd: "flatpickr",
      root: "Flatpickr"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: [/node_modules/],
        use: [{ loader: "babel-loader" }]
      }
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader"]
      //   })
      // }
    ]
  },
  plugins: [new UglifyJsPlugin(), new SizePlugin()]
};

// entry: {
//   bundle: "./src/stimulus-flatpickr.js"
// },
//
// output: {
//   path: path.resolve(__dirname, "dist"),
//   filename: outputFile
//   // library: "StimulusValidation",
//   // libraryTarget: "umd"
// },
