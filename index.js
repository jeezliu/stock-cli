const minimist = require('minimist')
const error = require('./error')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  // console.log(args)

  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'help':
      require('./cmds/help')(args)
      break

    case 'version':
      require('./cmds/version')(args)
      break
    
    case 'get':
      require('./cmds/get')(args)
      break
    
    case 'star':
      require('./cmds/star')(args)
      break

    case 'unstar':
      require('./cmds/unstar')(args)
      break

    default:
      error(`"${cmd}" is not a valid command!`, true)
      break
  }
}