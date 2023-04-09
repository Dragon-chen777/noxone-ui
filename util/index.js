function reWrightProps(defaultProps, config) { 
  for (let key in config) {
    if (key in defaultProps) {
      if (Object.prototype.toString.call(config[key]) !== `[object ${defaultProps[key].type.name}]`) {
        throw new Error(`NOxONE：the propsKey "${key}" should be ${defaultProps[key].type.name}`)
      } else {
        defaultProps[key].default = config[key]
      }
    }
  }
}
window.noxoneLog = noxoneLog
function noxoneLog(msg, color='#00a1d6') {
  console.log(`%c NOxONE提醒您：${msg}`,`color:${color}`)
}
export {
  reWrightProps,
  noxoneLog,
}