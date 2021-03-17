const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  // target: 'node',
  entry: {
    bundle: './src/index.ts',
    'bundle.min': './src/index.ts',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'curveJsSdk',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  node: {
    fs: "empty",
  },
  stats: {
    warnings: false,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/i,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
