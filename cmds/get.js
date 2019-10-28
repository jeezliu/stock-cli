const ora = require('ora')
const fetchStock = require('../utils/fetchStock')
const clearConsole = require('../utils/clearConsole')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const top = args.top || args.t

    const stockList = args._.slice(1);
    const stockRes = await fetchStock(stockList)

    spinner.stop()

    console.log(`stockList: ${stockList}`)
    console.log("stockRes", stockRes)

    // clearConsole()
  } catch (err) {
    spinner.stop()

    console.error(err)
  }

}