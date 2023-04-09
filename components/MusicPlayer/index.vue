<template>
  <div class="noxone-music-player" :style="globalSty" v-if="musicList.length">
    <div class="music-container" :class="{playing: isPlaying}">
      <div class="music-info">
        <div class="title">
          {{ curMusic.title }}
          <template v-if="isShowAuthor"> - {{ curMusic.author }}</template>
        </div>
        <div class="progress-container" @click="changeProgress($event)">
          <div :style="{width: playProgress}" class="progress"></div>
        </div>
      </div>
      <div class="music-cover">
        <img :src="curMusic.cover"/>
      </div>
      <div class="control-pannel">
        <div class="action-btn fas fa-backward" @click="playMusic('pre')"></div>
        <div :class="{'fa-pause': isPlaying, 'fa-play': !isPlaying}" class="action-btn action-btn-big fas"
             @click="playMusic('playOrPause')"></div>
        <div class="action-btn fas fa-forward" @click="playMusic('next')"></div>
      </div>
      <audio
        ref="audio"
        muted
        :src="curMusic.link"
        @ended="playMusic('next')"
        @timeupdate="updateProgress($event)"
      />
    </div>
  </div>
</template>
<script>
let AUDIO = null
export default {
  name: 'noxoneMusicPlayer', // <noxone-music-player/>
  props: {},
  data() {
    return {
      curMusicIdx: 0,
      isPlaying: false,
      playProgress: 0,
    }
  },
  computed: {
    curMusic() {
      return this.musicList[this.curMusicIdx]
    },
    globalSty() {
      return {
        '--n': this.width / 400,
        '--container-bg-color': this.containerBg, // 容器背景
        '--music-info-bg-color': this.musicInfoBg, // 音乐信息背景
        '--process-bar-bg': this.processBarBg, // 进度条背景
        '--process-bar-active-bg': this.processBarActiveBg, // 进度激活条背景 
        '--control-btn-color': this.controlBtnColor, // 控键按钮颜色
        '--music-title-color': this.musicTitleColor, // 音乐标题颜色
      }
    }
  },
  mounted() {
    if (!this.musicList.length) noxoneLog('NoxoneMusicPlayer组件中musicList貌似是空值')
    AUDIO = this.$refs.audio
  },
  methods: {
    playMusic(cmd) {
      const curIdx = this.curMusicIdx
      if (cmd === 'playOrPause') {
        if (this.isPlaying) {
          AUDIO.pause()
          this.$emit('pause', { 
            curIdx,
            curMusic: this.curMusic,
            currentTime: AUDIO.currentTime,
            duration: AUDIO.duration
          })
        }else{
          AUDIO.play()
          this.$emit('play', { 
            curIdx,
            curMusic: this.curMusic,
            currentTime: AUDIO.currentTime,
            duration: AUDIO.duration
          })
        }
        return this.isPlaying = !this.isPlaying
      }
      if (cmd === 'pre') {
        this.curMusicIdx = this.curMusicIdx === 0 ? this.musicList.length - 1 : --this.curMusicIdx
        return this.$nextTick(() => {
          AUDIO.play()
          this.$emit('switchPreSong', {
            fromIdx: curIdx,
            curMusic: this.curMusic,
            toIdx: this.curMusicIdx
          })
          this.isPlaying = true
        })
      }
      if (cmd === 'next') {
        this.curMusicIdx = ++this.curMusicIdx % this.musicList.length
        return this.$nextTick(() => {
          AUDIO.play()
          this.$emit('switchNextSong', {
            fromIdx: curIdx,
            curMusic: this.curMusic,
            toIdx: this.curMusic
          })
          this.isPlaying = true
        })
      }
    },
    changeProgress(e) {
      const width = e.target.clientWidth
      const clickX = e.offsetX
      const duration = AUDIO.duration
      const fromTime = AUDIO.currentTime
      const toTime = AUDIO.currentTime = (clickX / width) * duration
      this.$emit('changeProgress', {
        curIdx: this.curMusicIdx,
        curMusic: this.curMusic,
        fromTime,
        toTime,
      })
    },
    updateProgress(e) {
      const {duration, currentTime} = e.target
      this.playProgress = `${(currentTime / duration) * 100}%`
    },
  }
}
</script>
<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap')
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css')

*
  box-sizing border-box
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)
.noxone-music-player
  width calc(var(--n) * 400px)
.music-container
  position relative
  width calc(var(--n) * 400px)
  display flex
  background var(--container-bg-color)
  border calc(var(--n) * 1px) solid rgba(0, 0, 0, .2)
  box-shadow  calc(var(--n) * 2.8px) calc(var(--n) * 2.8px) calc(var(--n) * 2.2px) rgba(0, 0, 0, .02), 
              calc(var(--n) * 6.7px) calc(var(--n) * 6.7px) calc(var(--n) * 5.3px) rgba(0, 0, 0, .028), 
              calc(var(--n) * 12.5px) calc(var(--n) * 12.5px) calc(var(--n) * 10px )rgba(0, 0, 0, .035), 
              calc(var(--n) * 22.3px) calc(var(--n) * 22.3px) calc(var(--n) * 17.9px) rgba(0, 0, 0, .042), 
              calc(var(--n) * 41.8px) calc(var(--n) * 41.8px) calc(var(--n) * 33.4px) rgba(0, 0, 0, .05), 
              calc(var(--n) * 100px) calc(var(--n) * 100px) calc(var(--n) * 80px)rgba(0, 0, 0, .07)
  border-radius calc(var(--n) * 15px)
  padding calc(var(--n) * 20px) calc(var(--n) * 30px)
  transition all 0.5s ease-out

.music-container.playing
  .music-cover
    img
      animation-play-state running

  .music-info
    opacity 1
    transform translate(-50%,-100%)

.music-cover
  position relative
  width calc(var(--n) * 110px)

  &::after
    position absolute
    left 50%
    bottom 100%
    width calc(var(--n) * 15px)
    height calc(var(--n) * 15px)
    content ""
    background-color var(--container-bg-color)
    border-radius 50%
    transform translate(-50%, 50%)

  img
    border-radius 50%
    height calc(var(--n) * 110px)
    width inherit
    -o-object-fit cover
    object-fit cover
    position absolute
    bottom 0
    left 0
    animation rotate 3s linear infinite
    animation-play-state paused

.control-pannel
  display flex
  align-items center
  justify-content center
  z-index 9

  .action-btn
    border 0
    color var(--control-btn-color)
    font-size calc(var(--n) * 20px)
    cursor pointer
    padding calc(var(--n) * 10px)
    margin 0 calc(var(--n) * 15px)

  .action-btn-big
    font-size calc(var(--n) * 30px)

  .hide-btn
    position absolute
    top 0
    right 0
    width calc(var(--n) * 30px)
    height calc(var(--n) * 30px)
    line-height calc(var(--n) * 30px)
    text-align center
    font-size calc(var(--n) * 24px)
    font-weight 600
    cursor pointer
    color var(--control-btn-color)

.music-info
  position absolute
  top 0
  left 50%
  width calc(var(--n) * 360px)
  background var(--music-info-bg-color)
  border calc(var(--n) * 1px) solid rgba(0, 0, 0, .2)
  border-bottom-color transparent
  border-radius calc(var(--n) * 15px) calc(var(--n) * 15px) 0 0
  padding calc(var(--n) * 10px) calc(var(--n) * 10px) calc(var(--n) * 10px) calc(var(--n) * 150px)
  opacity 0
  transform translate(-50%,0)
  transition transform .3s ease-in, opacity .3s ease-in
  z-index 0

  .title
    text-align left
    font-size calc(var(--n) * 12px) 
    color var(--music-title-color)
    font-weight 600

.progress-container
  background-color var(--process-bar-bg)
  border-radius calc(var(--n) * 5px)
  cursor pointer
  margin calc(var(--n) * 10px) 0
  height calc(var(--n) * 4px)
  width 100%

  .progress
    background-color var(--process-bar-active-bg)
    border-radius calc(var(--n) * 5px)
    height 100%
    width 0
    transition width .1s linear

@keyframes rotate
  0%
    transform rotate(0)
  to
    transform rotate(1turn)
</style>
