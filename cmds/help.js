const menus = {
  main: `
    stock [command] <options>
    get .............. get stock price
    star ........... star stock
    unstar ........... unstar stock
    version ............ show package version
    help ............... show help menu for a command`,

  get: `
    stock get <options>
    --top, -t ..... show stock price realtime`,

  star: `
    stock star <options>
    `,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}