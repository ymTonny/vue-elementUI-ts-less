//下载参数
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
let downFlag = false;
let downUrl = "";
let downFileName = "";

/**
 * 下载回调
 */
function getHttpReqCallback(url, dirName, fileName) {
  var callback = function(res) {
    console.log("request: " + url + " return status: " + res.statusCode);
    var contentLength = parseInt(res.headers["content-length"]);

    var downLength = 0;

    var out = fs.createWriteStream(dirName + "/" + fileName);
    res.on("data", function(chunk) {
      downLength += chunk.length;
      var progress = Math.floor((downLength * 100) / contentLength);
      var str = "下载：" + progress + "%";
      console.log(str);

      //写文件
      out.write(chunk, function() {
        //console.log(chunk.length);
      });
    });
    res.on("end", function() {
      downFlag = false;
      console.log("end downloading " + url);
      if (isNaN(contentLength)) {
        console.log(url + " content length error");
        return;
      }
      if (downLength < contentLength) {
        console.log(url + " download error, try again");
        return;
      }
    });
  };

  return callback;
}

/**
 * 下载开始
 */
export function startDownloadTask(url, dirName, fileName, isHttps: boolean = false) {
  console.log("start downloading " + url);
  let req = null;
  if (isHttps) {
    req = https.request(url, getHttpReqCallback(url, dirName, fileName));
  } else {
    req = http.request(url, getHttpReqCallback(url, dirName, fileName));
  }

  req.on("error", function(e) {
    console.log("request " + url + " error, try again");
    console.log(e);
  });
  req.end();
}

// startDownloadTask('下载地址','本地存储路径','文件名');
