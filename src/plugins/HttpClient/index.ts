import { HttpClient as HttpClientXHR } from './HttpClient';
import {
  HttpClientMethod,
  HttpClientSuccessCondition,
  HttpClientSuccessCallbackData,
  HttpClientOptions,
  HttpClientExecMethod,
} from './IHttpClient';

class HttpClient<T> {
  public name = 'HttpClient';
  public execMethod: HttpClientExecMethod = 'ajax';
  public url: string = '';
  public param: string = '';
  public method: HttpClientMethod = 'GET';
  public autoReconnect?: boolean = false;
  public successCondition?: HttpClientSuccessCondition = (data: T) => true;
  // tslint:disable-next-line:member-ordering
  public successCallbackData?: HttpClientSuccessCallbackData;
  // tslint:disable-next-line:member-ordering
  public options!: HttpClientOptions<T>;
  // tslint:disable-next-line:member-ordering
  constructor(url: string, options: HttpClientOptions<T>) {
    this.url = url;
    this.options = options;
  }

  private initUrlQuery() {
    if ((this.url + '').indexOf('?') === -1) {
      this.url += '?';
    }
    const { query = {} } = this.options;
    const getValue = (v: any): string => {
      let result = '';
      if (typeof v === 'string') {
        result = v;
      }
      else if (v instanceof Object) {
        result = JSON.stringify(v);
      }
      else {
        if (typeof v === 'symbol') {
          result = v.toString();
        }
        else {
          result = v + '';
        }
      }
      return encodeURIComponent(result);
    }
    Object.keys(query).map((key, index) => {
      let value = getValue(query[key]);

      if (index === 0 && this.url.lastIndexOf('?') === this.url.length - 1) {
        value = `${key}=${value}`
      }
      else {
        value = `&${key}=${value}`
      }
      this.url += value;
    })
  }

  private analysisUrl() {
    const { param } = this;
    const urlLastIndex = this.url.lastIndexOf('?');
    if (!param) {
      return;
    }
    /**
     * 如果URL 中?符号在最后一位，则不需要添加&符号前缀，否则则需要添加。
     * 如果URL中不存在?符号，则手动添加?符号
     */
    if (urlLastIndex !== -1) {
      if (urlLastIndex !== this.url.length - 1) {
        this.url += '&';
      }
      this.url += `${param}`;
    } else {
      this.url += param.length > 0 ? `?${param}` : '';
    }
  }

  /**
   * run
   */
  // tslint:disable-next-line:member-ordering
  public run() {
    if (this.method.length === 0) {
      throw new Error(`HttoClientException:method can't be null`);
    }
    if(this.options.query) {
      this.initUrlQuery();
    }
    this.analysisUrl();

    return this.runXHR();
  }

  private runXHR(): Promise<T> {
    const {
      url,
      method,
      options,
      successCondition = () => true,
      successCallbackData = (data: T) => data,
    } = this;
    return new Promise((resolve, reject) => {
      return new HttpClientXHR<T>({
        url,
        method,
        ...options,
        success: (data: T) => {
          if (successCondition(data)) {
            resolve(successCallbackData(data));
          } else {
            reject(data);
          }
        },
        error: (status: number, data: T) => {
          reject(status);
        },
      });
    });
  }
}

export { HttpClient };
