const ora = require('ora')
const Configstore = require('configstore')
const getStock = require('./get')

const fetch = require('../utils/fetch')
const parse = require('../utils/parse')
const tabulate = require('../utils/tabulate')

module.exports =  async (args) => {

  const codes = args._.slice(1)
  const top = args.top || args.t
  const list = args.list || args.l
  // console.log(args)
  
  const config = new Configstore('stock-cli', {star: []})
  const starList = config.get('star')

  if(list) {
    if(starList.length === 0) {
      console.log('暂无关注')
      return
    }
    starList.forEach(item => {
      console.log(tabulate([item.name, item.code]))
    })
    return
  }

  if(codes.length > 0) {
    try {
      const exists = starList.filter(item => codes.some(code => code === item.code))
      exists.forEach(item => {
        console.log(`已有关注：${item.name}-${item.code}`)
      })
      // 检查新增关注
      const newAdds = codes.filter(code => !starList.some(item => item.code === code))
      const spinner = ora().start()
      const stocks = await fetch(newAdds)
      spinner.stop()
      const stockAdds = stocks.map((item, index) => {
        const [name, code] = parse(newAdds[index], item)
        return {name, code}
      })
      config.set('star', starList.concat(stockAdds))
      stockAdds.forEach(item => {
        console.log(`新加关注：${item.name}-${item.code}`)
      })
    } catch (err) {
      spinner.stop()
      if(err.message == 'starList.push is not a function') {
        config.set('star', [])
        console.log('关注异常，重试一次')
      }
      console.error(err)
    }
    return
  }

  if(top || codes.length === 0) {
    const starCodes = starList.map(item => item.code)
    getStock(Object.assign({}, args, {'_' : ['get'].concat(starCodes)}))
  }
}