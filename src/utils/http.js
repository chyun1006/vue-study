import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5025/',
  timeout: 5000,
})

let reqMap = new Map()

// 获取请求中的 url、method、params、data
const getPendingKey = (config) => {
  let { method, url, params, data } = config

  const dataStr = typeof data == 'string' ? data : JSON.stringify(data) // respose 返回的data 是string
  const key = [method, url, JSON.stringify(params), dataStr].join('&')
  return key
}

// 添加请求的方法
const addPendingReq = (config) => {
  let pendingKey = getPendingKey(config)
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  config.cancelToken = config.cancelToken || source.token
  if (!reqMap.has(pendingKey)) reqMap.set(pendingKey, source)

  return config
}

// 移除请求从map中
const removePending = (response) => {
  let pendingKey = getPendingKey(response)
  if (reqMap.has(pendingKey)) {
    const source = reqMap.get(pendingKey)
    source.cancel()
    reqMap.delete(pendingKey)
  }
}

instance.interceptors.request.use((config) => {
  console.log('请求报文', config)
  removePending(config)
  config = addPendingReq(config)
  console.log('请求', reqMap)
  return config
})

instance.interceptors.response.use(onFullfiled, onRejected)

function onFullfiled(response) {
  console.log('响应报文', response)
  removePending(response.config)
  console.log('请求', reqMap)
  return response
}

function onRejected(e) {
  console.log(e)
}

export default instance
