module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './index.js',
    library: 'curveJsSdk',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts$/, loaders: 'ts-loader' }],
  },
};
