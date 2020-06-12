import * as webpack from "webpack";
import * as merge from "webpack-merge";
import common from "./common.conf";
import * as os from "os";
import { mockInit } from "../../mock/index";
import { readFileSync } from "fs";
import * as path from "path";
import { mergeConfig } from "../config";

function getLocalNetwork() {
  const interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    const networks = interfaces[devName];
    for (let i = 0; i < networks.length; i++) {
      if (
        networks[i].family === "IPv4" &&
        !networks[i].internal &&
        networks[i].address.indexOf("127.0.0.1") === -1 &&
        networks[i].address.indexOf("169") !== 0
      ) {
        return networks[i];
      }
    }
  }
}

const config: webpack.Configuration = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "dist",
    compress: true,
    host: getLocalNetwork().address,
    port: 8080,
    before(app) {
      const configPath = path.resolve(__dirname, "../_config.json");
      try {
        mergeConfig(JSON.parse(readFileSync(configPath, "utf-8")));
      } catch (error) {
        if ((error + "").indexOf("such")) {
          console.error(`${path.resolve(__dirname, "../")}目录下没有配置代理文件_config.json`);
        } else {
          console.error(`'${configPath}'文件内容格式不是标准的JSON格式`);
        }
      }
      mockInit(app);
    }
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "less-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
export default merge(common, config);
