import { HttpClientOptions } from './IHttpClient';

interface XHR extends XMLHttpRequest {
  responseBody?: any;
}
declare global {
  interface Window {
    DGson: any
  }
}

export class HttpClient<T> {
  public options: HttpClientOptions<T> = {
    timeout: 10000,
    cache: true,
    url: '',
    method: 'GET',
    async: true,
  };
  public XHR!: XHR;
  public realResp: any;
  constructor(options: HttpClientOptions<T>) {
    this.options = Object.assign(this.options, options);
    this.init();
  }

  public init() {
    if (XMLHttpRequest) {
      this.XHR = new XMLHttpRequest();
    } else if (ActiveXObject) {
      this.XHR = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (this.XHR) {
      this.initResponse();
      this.open();
      this.initHeader();
      this.send();
    } else {
      throw new Error(`'HttpClientXHR' init failed!`);
    }
  }

  public initHeader() {
    const { headers, contentType, Encode, method = 'GET' } = this.options;
    if (headers instanceof Map) {
      headers.forEach((v, k) => {
        this.XHR.setRequestHeader(k, v);
      });
    } else if (headers instanceof Object) {
      Object.keys(headers).map((k) => {
        this.XHR.setRequestHeader(k, headers[k]);
      });
    }

    // 如果是POST\PUT\DELETE则必须要设置contentType(contentType设置为false时不设置)
    if (/^(post|put|delete)$/i.test(method) && !(typeof contentType === 'boolean' && !contentType)) {
      let contentTypeText = '';

      if (typeof contentType !== 'boolean' && contentType && contentType.length > 0) {
        const contentTypeReg = /\w+\/\w+;/.exec(contentType);
        if (contentTypeReg) {
          contentTypeText = contentTypeReg[0];
          if (Encode && Encode.length > 0) {
            contentTypeText += `charset=${Encode}`;
          } else {
            // 如果没有设置编码，则默认使用contentType传入的编码
            contentTypeText += `${contentTypeReg.input.replace(contentTypeText, '')}`;
          }
        }
      } else {
        contentTypeText = `application/x-www-form-urlencoded;`;
        if (Encode && Encode.length > 0) {
          contentTypeText += `charset=${Encode}`;
        } else {
          // 如果没有设置编码，则默认使用`utf-8`
          contentTypeText += `charset=utf-8`;
        }
      }
      this.XHR.setRequestHeader('content-type', contentTypeText);
    }
  }

  public open() {
    const { url = '', method = 'GET', async = true, username, password, cache, timeout = 0 } = this.options;

    let time = '';
    if (cache) {
      const t = new Date().getTime();
      time = url.indexOf('?') === -1 ? `?HttpClientXHRTime=${t}` : url.lastIndexOf('?') === url.length - 1 ? `HttpClientXHRTime=${t}` : `&HttpClientXHRTime=${t}`;
    }

    this.XHR.open(method.toUpperCase(), url + time, async, username, password);

    if (async) {
      try {
        this.XHR.timeout = timeout;
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(`Error setting timeout.`);
      }
    }
  }

  public send() {
    // console.log(this.options)
    // tslint:disable-next-line:no-shadowed-variable
    const { XHR } = this;
    // tslint:disable-next-line:prefer-const
    let { data, contentType = '' } = this.options;
    try {
      // console.log(data, contentType);
      if (/application\/json/i.test(contentType.toString()) && typeof data === 'object') {
        data = JSON.stringify(data);
        // console.log(1111);
      }
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(`'data' is not a serializable '${contentType}' structure `, error);
    }
    XHR.send(data);
  }

  public initResponse = () => {
    // tslint:disable-next-line:no-shadowed-variable
    const { XHR } = this;
    const { success = () => null, error = () => null, dataType = '' } = this.options;
    XHR.onreadystatechange = () => {
      let realResp;
      if (XHR.readyState === 4) {
        realResp = XHR.response;
        if (!realResp) {
          realResp = XHR.responseText;
        }
        if (!realResp && realResp.length < 1) {
          realResp = XHR.responseXML;
          if (JSON.stringify(realResp).length < 3) {
            // IE
            realResp = XHR.responseBody;
          }
        }
        this.realResp = realResp;

        let responseData = realResp;
        if (/^JSON$/i.test(dataType)) {
          try {
            responseData = JSON.parse(realResp);
            // responseData = new DGson(responseData, (result) => {
            //   /**
            //    * 精度丢失的时候使用原始报文，类型将会被改为string
            //    */
            //   // if(parseFloat(result.value) && parseFloat(result.value) > 9999999999999998){
            //   //   console.log(result)
            //   // }
            //   return (typeof result.value === 'number' && result.value > 9999999999999998) ? result.resource : result.value;
            // });
          } catch (error) {
            // tslint:disable-next-line:max-line-length
            const e = `The return result of this 'XHR' object is not a serializable '${dataType}' structure.Plese check the 'realResp' attribute of 'XHR'`;
            responseData = { HttpClientError: e };
            // tslint:disable-next-line:no-console
            console.error(e);
          }
        }
        if (0 < XHR.status && XHR.status < 400) {
          success(responseData);
        } else {
          error(XHR.status, responseData);
        }
      }
    };
  };
}
