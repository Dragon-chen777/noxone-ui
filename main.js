import cpnController from './components'
export default{
  install(Vue, config = {}) {
    for (let key in cpnController) {
      cpnController[key].name in config ?
        cpnController[key].install(Vue, config[cpnController[key].name])
        : cpnController[key].install(Vue)
    }
  }
}

import noxoneMusicPlayer from './components/MusicPlayer'
export {
  noxoneMusicPlayer,
} 


