module.exports = (code, info) => {
  if(!info) return ['', code, '', '']
  
  const arr = info.split(',')
  if(code.startsWith('sh') || code.startsWith('sz')) {
    const name = arr[0]
    const last = arr[2]
    const now = arr[3]
    const change = ((now - last) / last) * 100
    //return [name, code, now, change.toFixed(2)]
    const number = arr[8]/1000000
    return [name, code, now, change.toFixed(2), number.toFixed(2)+'万手']
  }
  if(code.startsWith('hk')) {
    const name = arr[1]
    const last = arr[3]
    const now = arr[6]
    const change = ((now - last) / last) * 100
    return [name, code, now, change.toFixed(2)]
  }
  if(code.startsWith('gb')) {
    const [name, now, change] = arr
    return [name, code, now, change]
  }
  return ['', code, '', '']
}
