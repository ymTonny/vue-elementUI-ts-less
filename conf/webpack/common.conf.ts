import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  entry: [path.resolve(__dirname, "../../src/main.ts")],
  output: {
    filename: "demo.[name].[hash].js",
    chunkFilename: "demo.[name].[hash].js",
    path: path.resolve(__dirname, "../../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader"
          },
          "ts-loader"
        ],
        exclude: [/node_modules/, /\.less\.d\.ts$/]
      },
      {
        test: /\.vue$/,
        loader: ["vue-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": path.resolve("src"),
      "@component": path.resolve("src/components"),
      "@constants": path.resolve("constants"),
      "@api": path.resolve("constants/api")
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../../public"),
    // 使用浏览器history时需要配置
    historyApiFallback: true,
    publicPath: "/"
  },
  plugins: [
    // new VuetifyLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "logo.png"
    }),
    new CopyWebpackPlugin([
      {
        // 指定根目录下的public为静态资源目录，web可以直接访问
        from: "public"
      }
    ])
  ]
};
export default config;
