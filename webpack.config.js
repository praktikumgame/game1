const path = require('path')
const isDev = process.env.NODE_ENV === 'development';
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const optimization = () => ({
  minimizer: isDev ? [] : [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  splitChunks: {
    chunks: 'all',
  },
});

const cssLoaders = (scss) => {
  const def = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    'postcss-loader',
  ];
  if (scss) {
    def.push('sass-loader');
  }

  return def;
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : '',
  optimization: optimization(),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders(true),
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contentHash].css',
    }),
    new CleanWebpackPlugin()
  ]
};