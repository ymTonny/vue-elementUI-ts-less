/** 定义模块文件让TS认识ta  */
declare module "*.less" {
  const less: any;
  export default less;
  export const main: any;
}
declare module "*.css" {
  const css: any;
  export default css;
  export const main: any;
}

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vuetify/es5/locale/zh-Hans" {
  const zh: any;
  export default zh;
}
