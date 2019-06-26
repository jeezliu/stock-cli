const minimist = require('minimist')
const error = require('./error')

module.exports = () => {

  console.log('0=======');
  console.log(process.argv);
  console.log('0=======');

  const args = minimist(process.argv.slice(2))

  console.log('=======');
  console.log(args);
  console.log('=======');

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
    
    case 'fetch':
      require('./cmds/fetch')(args)
      break
    
    default:
      error(`"${cmd}" is not a valid command!`, true)
      break
  }
}