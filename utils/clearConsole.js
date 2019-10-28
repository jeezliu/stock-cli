
module.exports = function () {
  process.stdout.write('\033[2J')
  process.stdout.write('\033[0f')
}