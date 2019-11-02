const Configstore = require('configstore')
const tabulate = require('../utils/tabulate')

module.exports =  async (args) => {
  const codes = args._.slice(1)
  
  const config = new Configstore('stock-cli', {star: []})
  const starList = config.get('star')
  
  if(codes.length > 0) {
    const filters = starList.filter(item => !codes.some(code => code === item.code))
    const removes = starList.filter(item => codes.some(code => code === item.code))
    config.set('star', filters)
    removes.forEach(item => {
      console.log(`取消关注：${item.name}-${item.code}`)
    })
  }
}