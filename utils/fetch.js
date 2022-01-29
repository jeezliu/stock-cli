
const axios = require('axios')
const iconv = require('iconv-lite')

module.exports = async (codes = []) => {
  const results = await axios({
    method: 'get',
    url: 'http://hq.sinajs.cn/list=' + codes.join(','),
    headers: {Referer: 'https://www.sina.com.cn'},
    responseType: 'stream'
  })
  
  return new Promise(resolve => {
    const chunks = []
    results.data.on('data', chunk => {
      chunks.push(chunk)
    })
    results.data.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const resStr = iconv.decode(buffer, 'GB18030')

      let resArr = []
      // 变量提取
      eval(resStr + 'resArr = [' + codes.map(e => 'hq_str_' + e).join(',') + ']')
      resolve(resArr)
    })
  })
}
