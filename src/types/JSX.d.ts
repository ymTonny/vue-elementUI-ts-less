import Vue, { VNode } from 'vue';
import { HttpClientOptions } from '@src/plugins/HttpClient/IHttpClient';
import { CSSStyle } from 'style';
import { HttpClients as httpClient } from '@src/plugins/HttpClient/Instance';
import { Store } from 'vuex';
interface BasicVueElement {
  [param: string]: any;
  /**
   * v-slot
   */
  scopedSlots?: {
    [key: string]: (ref: any) => JSX.Children;
  };
  /** 正常的HTML属性 */
  attrs?: {
    [key: string]: any;
  };
  /** 组件的props */
  props?: {
    [key: string]: any;
  };
  /** DOM属性 */
  domProps?: {
    [key: string]: any;
  };
  /** 事件监听器 */
  on?: {
    [key: string]: (...args: any[]) => void;
  };
  /** 原生事件，不能监听到vm.$emit */
  nativeOn?: {
    [key: string]: (...args: any[]) => void;
  };
  /** 自定义指令 */
  directives?: any[];
  /** key */
  key?: any;
  /** ref */
  ref?: string;
  /** 和`v-bind:style`一样的 API, 接收一个字符串、对象或对象组成的数组 */
  style?: CSSStyle | string;
  /** 和`v-bind:class`一样的 API, 接收一个字符串、对象或字符串和对象组成的数组 */
  class?: any | any[];
  /** 子组件的mounted */
  onMounted?: () => void;
  /** 子组件的beforeUpdate */
  onBeforeUpdate?: () => void;
  /** 子组件的update */
  onUpdated?: () => void;
  onclick?: (e: MouseEvent) => void;
  onmouseup?: (e: MouseEvent) => void;
  onkeyup?: (e: KeyboardEvent) => void;
  onkeydown?: (e: KeyboardEvent) => void;
  'v-model'?: any;
  vModel?: any;
  /** v-data-table */
  rowsPerPageItems?: Array<number | { text: string, value: number }>;
}

declare global {
  /** 可能为null */
  type MayNull<T> = T | null;
  /** KV表达式 string */
  type KVMap<T> = {
    [key: string]: T;
  };
  interface Window {
    app: Vue;
  }
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface ElementAttributesProperty {
      props?: any;
    }
    interface IntrinsicAttributes {
      // key?: string | number;
      vModel?: any;
      ref?: string;
      [key: string]: any;
      style?: CSSStyle | string;
    }
    interface IntrinsicClassAttributes<T> {
      key?: string | number;
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicElements {
      'v-expansion-panel-content': BasicVueElement & {
        scopedSlots?: {};
      };
      'v-treeview': BasicVueElement;
      'v-text-field': BasicVueElement & {
        value?: any;
        /** 项目名 */
        label?: string;
        oninput?: (value: string) => void;
      };
      'v-flex': BasicVueElement & {
        xs12?: boolean;
        xs6?: boolean;
        xs2?: boolean;
        xs1?: boolean;
      };
      [elem: string]: BasicVueElement;
    }

    type Children = string | JSX.Element | JSX.Element[] | null | undefined;
  }

  namespace echarts {
    interface EChartTitleOption {
      x: 'center';
    }
    // namespace EChartOption {
    //   interface SeriesParallel {
    //     lineStyle?: {
    //       color?: string;
    //       width?: number;
    //       type?: string;
    //       shadowBlur?: number;
    //       shadowColor?: string;
    //       shadowOffsetX?: number;
    //       shadowOffsetY?: number;
    //       opacity?: number;
    //     };
    //   }
    // }
  }
}

declare module 'vuex' {
  interface Store<S> {
    $commit: (_type: any, _payload?: any, _options?: any) => void;
    $dispatch: <T>(type: any, payload?: any) => Promise<T>;
  }

  interface ActionContext<S, R> {
    $commit: (_type: any, _payload?: any, _options?: any) => void;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    HttpClient: httpClient;
    _computedWatchers: {
      [key: string]: any;
    };
    computedPagination: any;
  }
}
