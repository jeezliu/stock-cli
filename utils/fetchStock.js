
const axios = require('axios')
const iconv = require('iconv-lite')

module.exports = async (stockList = []) => {
  const results = await axios({
    method: 'get',
    url: 'http://hq.sinajs.cn/list=' + stockList.join(','),
    responseType: 'stream'
  })
  
  return new Promise(resolve => {
    const chunks = []
    results.data.on('data', chunk => {
      chunks.push(chunk)
    })
    results.data.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const str = iconv.decode(buffer, 'GB18030')

      resolve(str)
    })
  })
}