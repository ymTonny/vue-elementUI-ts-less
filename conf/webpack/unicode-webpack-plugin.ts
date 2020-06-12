import { Compiler } from "webpack";

export default class UnicodeWebpackPlugin {

  public apply(compiler: Compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      console.log(`\n****unicode-webpack-plugin****`);
      compilation.chunks.map(chunk => {
        chunk.files.map(filename => {
          console.log('正在编译资源：', filename);
          compilation.assets[filename]._value = gbk2Unicode(compilation.assets[filename]._value);
        })
      })
      console.log(`\n****unicode-webpack-plugin end****\n`);
      callback();
    })
  }
}

function gbk2Unicode(content: string) {
  return content.replace(/([\u0080-\uffff])/g, (str) => {
    let hex = str.charCodeAt(0).toString(16);
    for (let i = hex.length; i < 4; i++) { 
      hex = '0' + hex;
    }
    return '\\u' + hex;
  })
}