const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  // filename: "[name].[contenthash].css",
  filename: "style.css"
});

const copyAssets = new CopyWebpackPlugin([
  {from:'index.html', to:'.'}
]);

module.exports = [
  {
    name: "frontend",
    mode: "development",
    entry: __dirname + "/src/app.tsx",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: "url-loader?limit=100000"
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
      ]
    },

    plugins: [
      extractSass,
      copyAssets
    ],

    output: {
      filename: "bundle.js",
      publicPath: '/',
      path: __dirname + "/dist"
    },
    devServer: {
      contentBase: './dist',
      historyApiFallback: true
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", '.scss']
    },
  },
];
