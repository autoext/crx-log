const webpack = require('webpack');
const pkg = require('./package');

const {
  version
} = pkg;

const banner = `crx-log v${version}
${new Date().toLocaleString()}`;

module.exports = {
  mode: "development",
  // devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    filename: `crx-log-v${version}.js`
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
    }),
  ]
};