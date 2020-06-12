export type HttpClientFetchMode =
  | 'cors'
  | 'no-cors'
  | 'same-origin'
  | 'navigate';
export type HttpClientMethod =
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'PUT'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'COPY'
  | 'LINK'
  | 'UNLINK'
  | 'PURGE'
  | 'LOCK'
  | 'UNLOCK'
  | 'PROPFIND'
  | 'VIEW';
export type HttpClientResponseType =
  | ''
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'moz-blob'
  | 'moz-chunked-text'
  | 'moz-chunked-arraybuffer'
  | 'ms-stream';
export type HttpClientEncode =
  | 'UTF-8'
  | 'UTF-15'
  | 'GB2312'
  | 'GBK'
  | 'ANSI'
  | 'UCS-2'
  | 'BIG5';
export type HttpClientContentType =
  | 'application/json'
  | 'application/xml'
  | 'application/javascript'
  | 'text/plain'
  | 'text/xml'
  | 'text/html'
  | 'text/css';
export type HttpClientDataType =
  | 'json'
  | 'string'
  | 'number'
  | 'boolean'
  | 'xml'
  | 'null'
  | 'undefined';
export type HttpClientExecMethod = 'fetch' | 'ajax' | 'form';
export type HttpClientEachConnectionErrorCallback = (
  status: number,
  data: any,
) => void;

export type HttpClientSuccessCondition = (data: any) => boolean;

export type HttpClientSuccessCallbackData = (data: any) => any;
export interface HttpClientFetchOptions<T> extends HttpClientOptions<T> {
  /**
   * 请求的上下文
   */
  context?: string;
  /**
   * 请求来源
   */
  referrer?: string;
  /**
   * 请求策略
   */
  referrerPolicy?: string;
  /**
   * 请求模式
   */
  mode?: HttpClientFetchMode;
  /**
   * 请求的证书
   */
  credentials?: string;
}
export interface ObjectAny {
  [name: string]: string;
}

export interface HttpClientXHROptions<T> extends HttpClientOptions<T> {
  /**
   * responseType
   */
  responseType?: HttpClientResponseType;

  /**
   * 请求验证信息，一般情况下默认不填
   */
  username?: string;
  /**
   * 请求验证信息，一般情况下默认不填
   */
  password?: string;
  /**
   * success `callback`
   */
  success?: (data: any) => void;
  /**
   * error `callback
   */
  error?: (status: number, data: any) => void;
  /**
   * 是否允许IE缓存（添加时间戳）
   */
  cache?: boolean;
  /**
   * async
   */
  async?: boolean;
}

export interface HttpClientOptions<T> {
  /**
   * **default:** `10000`
   */
  timeout?: number;
  /**
   * **default:** `true`
   */
  cache?: boolean;
  headers?: Map<string, string> | ObjectAny;
  contentType?: string | boolean;
  /**
   * **default:** `UTF-8`
   */
  Encode?: string;
  /**
   * **default:** `GET`
   */
  method?: HttpClientMethod;
  url?: string;
  /**
   * **default:**  `true`
   */
  async?: boolean;
  username?: string;
  password?: string;
  data?: any;
  success?: (data: T) => void;
  error?: (status: number, data: T) => void;
  dataType?: string;
  /**
   * URL query参数对象，key=paramKey，value=encodeURIComponent(paramValue)
   */
  query?: {[key: string]: any}
}
