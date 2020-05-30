const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (env, options) => ({
  entry: {
    index: './src/',
    load: './src/load',
    shell: './src/shell',
    query: './src/query',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      template: './src/shared/html/baseof.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'Script Runner',
      template: './src/shared/html/baseof.html',
      filename: 'load.html',
      chunks: ['load'],
    }),
    new HtmlWebpackPlugin({
      title: 'Web Shell',
      template: './src/shared/html/baseof.html',
      filename: 'shell.html',
      chunks: ['shell'],
    }),
    new HtmlWebpackPlugin({
      title: 'Query API',
      template: './src/shared/html/baseof.html',
      filename: 'query.html',
      chunks: ['query'],
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join('./src/index.html'),
        template_filename: 'index.html',
        location: 'main',
      },
      {
        path: path.join('./src/load/load.html'),
        template_filename: 'load.html',
        location: 'main',
      },
      {
        path: path.join('./src/shell/shell.html'),
        template_filename: 'shell.html',
        location: 'main',
      },
      {
        path: path.join('./src/query/query.html'),
        template_filename: 'query.html',
        location: 'main',
      },
      {
        path: path.join('./src/shared/html/aside.html'),
        template_filename: '*',
        location: 'main',
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: options.mode === 'development',
            },
          },
          {loader: 'css-loader', options: {importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('precss'),
                require('tailwindcss')('./tailwind.config.js'),
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 5000,
  },
  optimization: {
    minimize: options.mode === 'production',
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
    runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/](alpinejs|codemirror|vue)[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
  performance: {
    hints: false,
    // maxEntrypointSize: 512000,
    // maxAssetSize: 512000,
  },
});
