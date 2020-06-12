import * as express from "express";
import * as httpProxy from "http-proxy";
import Config from "../conf/config";
import { readFileSync } from "fs";
import * as path from "path";

enum MockFrameworkCode {
  SUCCESS = 200,
  ERROR = 10000
}
interface MockFRameworkResult<T> {
  code: MockFrameworkCode;
  msg: string;
  data: T;
}
export class MockFramework<T> {
  private _code: MockFrameworkCode = MockFrameworkCode.SUCCESS;
  private _msg: string = "";
  constructor(private _data: T) {}

  public getCode() {
    return this._code;
  }

  public getMsg() {
    return this._msg;
  }

  public getData() {
    return this._data;
  }

  public getResult(): MockFRameworkResult<T> {
    return {
      code: this._code,
      msg: this._msg,
      data: this._data
    };
  }
}

const proxy = httpProxy.createProxyServer();

export function mockInit(app: express.Application) {
  function setMock<T>(url: string, result: T, flag: boolean = true) {
    app.use(url, (req, resp) => {
      if (Config.mock && flag) {
        resp.json(new MockFramework(result).getResult());
      } else {
        console.log("Proxy to url: " + Config.proxyUrl + req.baseUrl.replace("/api", ""));
        proxy.web(req, resp, { target: Config.proxyUrl + req.baseUrl.replace("/api", "") }, err => {
          console.log(err);
        });
      }
    });
  }
  app.use("/config/:action/:key", (req, resp) => {
    const { action, key } = req.params;
    if (action === "start") {
      Config[key] = true;
      resp.send(`${key}已启用`);
    } else if (action === "close") {
      Config[key] = false;
      resp.send(`${key}已关闭`);
    } else if (action === "set") {
      Config[key] = req.query.value;
      resp.send(`${key}值修改为${req.query.value}`);
    }
  });
  app.use("/config", (req, resp) => {
    resp.json(Config);
  });

  setMock("/api/**", "", false);
}

