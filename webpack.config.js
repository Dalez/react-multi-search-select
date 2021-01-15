var path = require('path');

module.exports = {
  mode: 'production',
  target: "es5",
  entry: './src/index.tsx',
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    "react": "react",
    "react-dom": "react-dom"
  }
}
