import cpns from './components'
// 1. 单个组件导入
// import { NoxoneMusicPlayer } from 'noxone-ui'; 
// Vue.use(NoxoneMusicPlayer, {
//   props: {
//     isShowAuthor: false,
//     ...
//   }
// })

// 2. 全部组件导入
// import noxoneUI from 'noxone-ui'
// Vue.use(noxoneUI, {
//   NoxoneMusicPlayer: {
//     props: {
//       isShowAuthor: false,
//       ...
//     }
//   }
// })
export default {
  ...cpns, 
  install(Vue, config = {}) {
    [...cpns].forEach(cpn => {
      cpn.name in config ? cpn.install(Vue, config[cpn.name]) : cpn.install(Vue)
    })
  },
}