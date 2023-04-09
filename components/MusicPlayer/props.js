export default {
  musicList: {
    type: Array,
    default: []
  },
  isShowAuthor: {
    type: Boolean,
    default: true
  },
  // cssVar
  width: {
    type: Number,
    default: 400
  },
  containerBg: {
    type: String,
    default: '#fff', 
  },      
  musicInfoBg: {
    type: String,
    default: 'rgba(255, 255, 255, 0.5)',              
  },
  processBarBg: {
    type: String,
    default: 'rgb(230, 230, 230)'
  },
  processBarActiveBg: {
    type: String,
    default: '#0cdae9'
  },
  controlBtnColor:{
    type: String,
    default:'#0cdae9',
  },
  musicTitleColor: {
    type: String,
    default: '#000',
  }
}