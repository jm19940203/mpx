import * as platformApi from './platform'
import { getEnvObj } from './common/js'
import promisify from './common/js/promisify'

export default function install (target, options = {}) {
  const {
    usePromise = false, // 是否转为 promise 格式
    whiteList = [], // 强制变成 promise 格式的 api
    blackList = [], // 强制不变成 promise 格式的 api
    custom = {}, // 自定义转化规则
    fallbackMap = {} // 对于不支持的API，允许配置一个映射表，接管不存在的API
  } = options

  let transedApi = {}

  if (__mpx_env__ === 'web') {
    transedApi = platformApi
  } else {
    const envObj = getEnvObj()
    Object.keys(envObj).concat(Object.keys(platformApi)).forEach((key) => {
      transedApi[key] = platformApi[key] || envObj[key]
    })
  }

  const promisedApi = usePromise ? promisify(transedApi, whiteList, blackList) : {}
  Object.assign(target, fallbackMap, transedApi, promisedApi, custom[__mpx_env__])
}

export function getProxy (options = {}) {
  const apiProxy = {}
  install(apiProxy, options)
  return apiProxy
}
