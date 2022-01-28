// 1. 封装 axios 的请求，返回重新封装的数据格式
// 2. 对错误的统一处理

import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取 axios 配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设定拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      // console.log('config:' + config)
      return config
    }, (err) => {
      // Do something with request error
      errorHandle(err)
      return Promise.reject(err)
    })
    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('res is:' + res)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      errorHandle(err)
      return Promise.reject(err)
    })
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'get',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
