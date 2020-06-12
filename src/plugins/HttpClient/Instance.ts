import { HttpClientXHROptions, HttpClientSuccessCondition, HttpClientSuccessCallbackData, HttpClientOptions } from "./IHttpClient";
import { HttpClient } from "./index";
import Vue, { VueConstructor } from "vue";

interface DemoApi<T> {
  code: number;
  data: T;
  msg: string;
}

const apiPath = "/api";

function getApiPath(url: string) {
  /** 正式环境（提交代码时只能是这个） */
  const host = apiPath;
  return host;
}

const commonOpt: HttpClientXHROptions<any> = {
  cache: false,
  dataType: "json",
  contentType: "application/json;charset=utf-8",
  timeout: 1000 * 60 * 60
};

function getCommonOptions() {
  return commonOpt;
}

const commonSuccessCondition: HttpClientSuccessCondition = (data?: DemoApi<any>) => {
  return typeof data === "object" && data.code === 200;
};

const commonSuccessCallbackData: HttpClientSuccessCallbackData = (data?: DemoApi<any>) => {
  return typeof data === "object" ? data.data : data;
};

export async function errorDialog<T>(data?: DemoApi<T>): Promise<any> {
  if (data && typeof data.code === "number") {
    throw data.data;
  } else {
    console.error("接口调用失败：" + JSON.stringify(data));
  }
  throw "";
}

export function $get<T>(url: string, options: HttpClientOptions<T> = {}): Promise<T> {
  const httpClient = new HttpClient(url, options);
  httpClient.method = "GET";
  httpClient.execMethod = "ajax";
  return httpClient.run().catch<T>(errorDialog);
}

export function get<T>(url: string, options?: HttpClientOptions<T>): Promise<T> {
  const httpClient = new HttpClient<T>(getApiPath(url), {
    ...options
  });
  httpClient.method = "GET";
  httpClient.execMethod = "ajax";
  httpClient.successCondition = commonSuccessCondition;
  httpClient.successCallbackData = commonSuccessCallbackData;
  return httpClient.run().catch(errorDialog);
}

export function deleted<T>(url: string): Promise<T> {
  const httpClient = new HttpClient(getApiPath(url), getCommonOptions());
  httpClient.method = "DELETE";
  httpClient.execMethod = "ajax";
  httpClient.successCondition = commonSuccessCondition;
  httpClient.successCallbackData = commonSuccessCallbackData;
  return httpClient.run().catch(errorDialog);
}

export function post<T>(url: string, data: any, options?: HttpClientOptions<T>): Promise<T> {
  const httpClient = new HttpClient(getApiPath(url), {
    ...getCommonOptions(),
    ...options,
    data
  });
  httpClient.method = "POST";
  httpClient.execMethod = "ajax";
  httpClient.successCondition = commonSuccessCondition;
  httpClient.successCallbackData = commonSuccessCallbackData;
  return httpClient.run().catch(errorDialog);
}

export function put<T>(url: string, data: any, options?: HttpClientOptions<T>): Promise<T> {
  const httpClient = new HttpClient(getApiPath(url), {
    ...options,
    data
  });
  httpClient.method = "PUT";
  httpClient.execMethod = "ajax";
  httpClient.successCondition = commonSuccessCondition;
  httpClient.successCallbackData = commonSuccessCallbackData;
  return httpClient.run().catch(errorDialog);
}

export function patch<T>(url: string, options?: HttpClientOptions<T>): Promise<T> {
  const httpClient = new HttpClient<T>(getApiPath(url), {
    ...options
  });
  httpClient.method = "PATCH";
  httpClient.execMethod = "ajax";
  httpClient.successCondition = commonSuccessCondition;
  httpClient.successCallbackData = commonSuccessCallbackData;
  return httpClient.run().catch(errorDialog);
}

export const http = {
  $get,
  get,
  post,
  put,
  patch,
  delete: deleted
};

export default {
  install(Vue: VueConstructor) {
    // tslint:disable-next-line:no-shadowed-variable
    Vue.prototype.HttpClient = http;
  }
};

export interface HttpClients {
  $get<T>(url: string, options?: HttpClientOptions<T>): Promise<T>;
  get<T>(url: string, options?: HttpClientOptions<T>): Promise<T>;
  delete<T>(url: string): Promise<T>;
  post<T>(url: string, data: any, options?: HttpClientOptions<T>): Promise<T>;
  put<T>(url: string, data: any, options?: HttpClientOptions<T>): Promise<T>;
  patch<T>(url: string, options?: HttpClientOptions<T>): Promise<T>;
}
