// Define this constant for easier usage
const isProd = process.env.NODE_ENV === 'production';

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const config = {

  // Sets mode as required by webpack
  mode: isProd ? 'production' : 'development',

  // Include source maps in development files
  devtool: isProd ? false : '#cheap-module-source-map',

  entry: {
    // Main entry point of our app
    app: resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    // As mentioned before, built files are stored in dist
    path: resolve(__dirname, 'dist'),

    // In our case we serve assets directly from root
    publicPath: './',

    // We add hash to filename to avoid caching issues
    filename: '[name].[hash].js'
  },

  resolve: {
    extensions: ['*', '.js'],
    modules: [
      resolve(__dirname, 'node_modules')
    ]
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],

        // Dependencies do not require transpilation
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        /**
          * PNG/JPEG/GIF/SVG images with size 
          * less than 10 KO are loaded via DataURL 
          * and with larger size with URL 
          * images/[name].[hash:7].[ext] where 
          * [hash:7] is randomly generated 7-characters 
          * hash.
          */
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(webm|mp4)$/,
        loader: 'file-loader',
        options: {
          name: 'videos/[name].[hash:7].[ext]'
        }
      }
    ],
  },

  plugins: [
		
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      quiet: false,
      emitErrors: true,
      syntax: 'scss'
    }),

    new HtmlWebpackPlugin({
      title: 'SPA tutorial',
      template: resolve(__dirname, 'src', 'html', 'index.ejs')
    }),

    /*// Combines all CSS files into one file */
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
      disable: !isProd
    }),
  ]
}

if (!isProd) {
  config.devServer = {
    contentBase: resolve(__dirname, '..', 'static'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    open: true
  }
}

module.exports = config
