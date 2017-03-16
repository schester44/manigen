'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
   // all configuration gets set in the config object
  var config = {};

   // app entry point (http://webpack.github.io/docs/configuration.html#entry)
  config.entry = {
    app: './src/app/bootstrap/index.js'
  };

  // output config (http://webpack.github.io/docs/configuration.html#output)
  config.output = {
    // Absolute output directory
    path: path.join(__dirname, 'dist'),

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProd ? 'https://schester44.github.io/manifest/' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

   // Type of sourcemap to use per build type (http://webpack.github.io/docs/configuration.html#devtool)
  config.devtool = isProd ? 'source-map' : 'eval-source-map';

   // config.module handles most of the magic responsible for converting modules
   // Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   // List: http://webpack.github.io/docs/list-of-loaders.html
  // Initialize module
  config.module = {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./[hash].[ext]'
      },
      {
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }, {
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess css with PostCSS plugins
        test: /\.(scss|css)$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.

        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader',
              query: {
                data: "@import 'bootstrap'; $env: " + process.env.npm_lifecycle_event + ";",
                includePaths: [
                  path.resolve(__dirname, 'src/style'),
                  require('node-bourbon').includePaths,
                  require('bourbon-neat').includePaths
                ],
                outputStyle: 'compressed',
                sourceMap: true
              }
            }
          ]
        })
      }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to code
      // You can add here any file extension you want to get copied to output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
        test: /\.html$/,
        loader: 'raw-loader'
      }]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ];

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),

    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
  );

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin(),
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        mangle: false // disabled this because of an injector error in angular --- need to look into re-enabling this
      }),
      // Copy assets from the public folder
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'src/public')
      }])
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();
