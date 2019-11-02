const ora = require('ora')
const chalk = require('chalk')

const fetch = require('../utils/fetch')
const parse = require('../utils/parse')
const tabulate = require('../utils/tabulate')
const clear = require('../utils/clear')

const getStock = async (args) => {
  const spinner = ora().start()

  try {
    const top = args.top || args.t
    const codes = args._.slice(1)
    
    const stocks = await fetch(codes)

    spinner.stop()
    clear()
    console.log(tabulate(['名称', '代码', '最新', '涨幅']))
    stocks.forEach((item, index) => {
      const stockInfo = parse(codes[index], item)

      const template = tabulate(stockInfo)
      const [, , , change] = stockInfo
      if(change > 0) {
        console.log(chalk.red(template))
      } else if(change < 0) {
        console.log(chalk.green(template))
      } else {
        console.log(template)
      }
    })
    
    if(top) {
      setTimeout(() => {
        getStock(args)
      }, 3000)
    }
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}

module.exports = getStock