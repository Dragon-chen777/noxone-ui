## 0. NOxONE UI库
这是一个轻量且Awesome的`Vue UI库`，作者个人博客[NOxONE](https://dragon-chen777.github.io/NOxONE)，项目Github地址[noxone-ui](https://github.com/Dragon-chen777/noxone-ui)，喜欢的话，右上角点个star⭐吧，您的一个小小动作对我来说就是最大的鼓励和支持（小声哔哔：毕竟谁也不想辛苦做的东西到头来却无人问津对吧？）

废话不多说，让我们步入正题
## 1. 安装
```sheel
npm i noxone-ui
yarn add noxone-ui
```

## 2. 注册组件
在vue入口文件`main.js`下，通过`use(noxoneUI)`的方式注册组件
```js
import Vue from 'vue'
// 1. 注册全部组件
import noxoneUI from 'noxone-ui'
Vue.use(noxoneUI)

// 2. 注册单个组件（当然了，目前也只有一个组件，那就是noxoneMusicPlayer，后续会更新的~）
import { noxoneMusicPlayer } from 'noxone-ui'
Vue.use(noxoneMusicPlayer, {
  props: { // 支持修改默认的props
    width: 300, // 宽度默认是400px，这里替换默认值为300px
  }
})
```
对于Vue3这样导入
```js
import { createApp } from 'vue'
import App from './App.vue'
// 1. 注册全部组件
import noxoneUI from './ui/main'
createApp(App)
  .use(noxoneUI)
  .mount('#app')

// 2. 注册单个组件
import { noxoneMusicPlayer } from 'noxone-ui'
createApp(App)
  .use(noxoneMusicPlayer, {
    props: { // 支持修改默认的props
      width: 300, // 宽度默认是400px，这里替换默认值为300px
    }
  })
  .mount('#app')
```

## 3. 使用
这里拿`noxone-music-player`组件来举例
```html
<template>
  <div id="app">
    <noxone-music-player 
      :musicList="musicList"
      width="400"
      containerBg="#fff"
      @play="onPlay"
      @switchNextSong="onSwitchNextSong"
    />
  </div>
</template>
<script>
export defaut {
  data() {
    return {
      musicList: [
        {
          title: 'Melody',
          author: '陶喆',
          cover: 'https://dragon-chen777.github.io/assets/music/Melody.png',
          link: 'https://dragon-chen777.github.io/assets/music/Melody.mp3',
        },
        // ...
      ]
    }
  }
}
</script>
```

## 4. 组件配置
### 4.1 noxone-music-player
#### 4.1.1 属性
##### musicList
歌曲列表，Array类型，必填，格式如下
```js
musicList: [
  {
    title: 'Melody', // 标题
    author: '陶喆', // 歌手
    cover: 'https://dragon-chen777.github.io/assets/music/Melody.png', // 封面
    link: 'https://dragon-chen777.github.io/assets/music/Melody.mp3', // 链接
  },
  // ...
]
```
##### width
组件宽度，Number类型，默认值`400`
##### containerBg
容器背景，String类型，默认值`#ffffff`
##### musicInfoBg
音乐信息背景，String类型，默认值`rgba(255, 255, 255, 0.5)`
##### processBarBg
进度条底框背景，String类型，默认值`rgb(230, 230, 230)`
##### processBarActiveBg
进度条背景,String类型，默认值`#0cdae9`
##### controlBtnColor
控件按钮颜色，String类型，默认值`#0cdae9`
##### musicTitleColor
音乐标题颜色，String类型，默认值`#000000`

#### 4.1.2 事件
##### play
点击播放按钮时触发，抛发一个event对象
```js
this.$emit('play', { 
  curIdx, // 当前播放音乐索引
  curMusic, // 当前播放音乐
  currentTime, // 当前播放时长
  duration， // 当前播放音乐的总时长
})
```
##### pause
点击暂停按钮时触发
```js
this.$emit('pause', { 
  curIdx,
  curMusic,
  currentTime,
  duration
})
```
##### switchPreSong
切换上一首时触发
```js
this.$emit('switchPreSong', {
  fromIdx, // 切换前音乐索引
  toIdx， // 切换后音乐索引
  curMusic
})
```
##### switchNextSong
```js
this.$emit('switchNextSong', {
  fromIdx, 
  toIdx，
  curMusic,
})
```
##### changeProgress
点击改变进度条时触发
```js
this.$emit('changeProgress', {
  curIdx,
  curMusic,
  fromTime, // 改变前播放时长
  toTime // 改变后播放时长
})
```
### 4.2 noxone-todo
目前只有一个组件，更新Todo~