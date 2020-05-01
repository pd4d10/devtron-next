const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import('webpack').Configuration} */
const config = {
  watch: true,
  mode: 'development',
  target: 'electron-main',
  entry: {
    devtron: './src/devtron.ts',
    index: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|woff2?|ttf|eot)$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'devtron',
      filename: 'devtron.html',
      chunks: ['devtron'],
    }),
    new HtmlWebpackPlugin({
      title: 'devtron',
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
}

module.exports = config
