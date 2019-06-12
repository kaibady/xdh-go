// 静态配置对象
const staticConfig = window.__config__ || {}

// debug 开关，可以打印日志, 只对 production 环境有效，开发环境默认是开启debug
export const DE_BUG = false

// 请求响应成功code
export const AJAX_SUCCESS = 0

// 请求地址前缀
export const API_HOST = staticConfig['API_HOST'] || 'http://127.0.0.1:8080'

