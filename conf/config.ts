
export const Config = {
  mock: false,
  proxyUrl: ''
}

export default Config;
export function mergeConfig(conf: object) {
  console.log(`正在合并配置文件`)
  Object.assign(Config, conf);
}