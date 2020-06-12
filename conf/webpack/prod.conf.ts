import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import common from './common.conf';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
import UnicodeWebpackPlugin from './unicode-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader', options: {
              modules: true
            }
          },
          {
            loader: 'less-loader'
          }
        ],
        exclude: /node_modules/,
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
  },
  plugins: [new CleanWebpackPlugin(), new UnicodeWebpackPlugin()]
};
export default merge(common, config);
