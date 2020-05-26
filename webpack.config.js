const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Script Runner',
      template:'./src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'Script Load',
      template: './src/load/load.html',
      filename: 'load.html',
      chunks: ['load'],
    }),
    new HtmlWebpackPlugin({
      title: 'Web Shell',
      template: './src/shell/shell.html',
      filename: 'shell.html',
      chunks: ['shell'],
    }),
    new HtmlWebpackPlugin({
      title: 'Query API',
      template: './src/query/query.html',
      filename: 'query.html',
      chunks: ['query'],
    }),
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
                require('tailwindcss'),
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
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 5000
  }
};