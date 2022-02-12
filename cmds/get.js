const ora = require('ora')
const chalk = require('chalk')

const fetch = require('../utils/fetch')
const parse = require('../utils/parse')
const tabulate = require('../utils/tabulate')
// const clear = require('../utils/clear')

const getStock = async (args) => {
  const spinner = ora().start()

  try {
    const top = args.top || args.t
    const codes = args._.slice(1)
    
    const stocks = await fetch(codes)

    spinner.stop()
    // clear()
    var date = new Date();
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() < 10 ? '0'+(date.getDate())+'T' : date.getDate()+'T';
    h = date.getHours() < 10 ? '0'+(date.getHours())+':' : date.getHours()+':';
    m = date.getMinutes() < 10 ? '0'+(date.getMinutes())+':' : date.getMinutes()+':';
    s = date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds();
    console.log(Y+M+D+h+m+s);
   // console.log(tabulate(['名称', '代码', '最新', '涨幅']))
    console.log(tabulate(['名称', '代码', '最新', '涨幅', '成交量']))
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
