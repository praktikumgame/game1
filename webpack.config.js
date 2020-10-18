const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const optimization = () => ({
  minimizer: isDev ? [] : [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  splitChunks: {
    chunks: 'all',
  },
});

const cssLoaders = () => {
  const def = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    'postcss-loader',
  ];
  return def;
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev && 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  optimization: optimization(),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders(true),
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,

              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contentHash].css',
    }),
    new CleanWebpackPlugin(),
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
