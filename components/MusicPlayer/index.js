import cpn from "./index.vue"
import defaultProps from './props'
import { reWrightProps, noxoneLog } from '../../util'
export default {
  name: cpn.name,
  install(Vue, config) {

    if (Object.prototype.toString.call(config) === '[object Object]') {
      config['props'] && reWrightProps(defaultProps, config['props']) // 在注册插件时可以全局初始化组件的props
    }
    cpn.props = { ...cpn.props, ...defaultProps }
    
    Vue.component(cpn.name, cpn)
    noxoneLog(`${cpn.name}组件已成功载入，欢迎造访作者的小破站：https://dragon-chen777.github.io/NOxONE/`)
    return Vue
  }
} 
