const ora = require('ora')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    setTimeout(() => {
      spinner.stop()
    }, 2000);
    
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}