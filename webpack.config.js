const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
  entry: {
    index: './src/',
    load: './src/load',
    shell: './src/shell',
    query: './src/query',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'Load Script',
      template: './src/index.html',
      filename: 'load.html',
      chunks: ['load'],
    }),
    new HtmlWebpackPlugin({
      title: 'Web Shell',
      template: './src/index.html',
      filename: 'shell.html',
      chunks: ['shell'],
    }),
    new HtmlWebpackPlugin({
      title: 'Query API',
      template: './src/index.html',
      filename: 'query.html',
      chunks: ['query'],
    }),
    // new HtmlWebpackPartialsPlugin([
    //   {
    //     path: path.join(__dirname, './src/index.html'),
    //     priority: 'high',
    //     location: 'head'
    //   }
    // ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
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
        ]
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
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 5000
  }
};