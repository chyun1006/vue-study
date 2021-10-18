const express = require('express')
const app = express()

app.all('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  console.log(req)
  res.end('hello world')
})

app.listen('5025', () => {
  console.log('服务启动成功')
})
