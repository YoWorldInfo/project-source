<template>
  <div class="content">
    <div class="switch-container">
      <AntSwitch id="enabled" v-model="enabled" @change="saveImage" />
      <span>Enable Redirect</span>
      <div style="flex-grow: 1"></div>
      <a href="https://yoworld.info" target="_blank">YoWorld Info</a>
    </div>

    <img
      @error="src = 'https://i.imgur.com/XTC5sAg.png'"
      class="image"
      :src="src"
      alt="Couldn't load image"
    />

    <div class="input-group">
      <Input v-model="newurl" @change="e => (src = e.target.value)" />
      <Button type="primary" block @click="setClick">
        {{ button }}
      </Button>
    </div>
  </div>
</template>

<script>
import { Button, Switch, Input, Icon } from 'ant-design-vue'

export default {
  components: {
    Button,
    AntSwitch: Switch,
    Input
  },

  data() {
    return {
      enabled: false,
      src: 'https://i.imgur.com/8AoVUG0.png',
      newurl: '',
      button: 'Set new image'
    }
  },

  methods: {
    // Set click
    setClick() {
      this.saveImage()
      this.button = 'Saved'
      setTimeout(() => {
        this.button = 'Set new image'
      }, 500)
    },

    // Load an image
    loadImage() {
      chrome.storage.local.get('img', url => {
        let img =
          url.hasOwnProperty('img') && url.img.hasOwnProperty('length')
            ? url.img[0]
            : 'https://i.imgur.com/8AoVUG0.png'
        let enabled =
          url.hasOwnProperty('img') && url.img.hasOwnProperty('length') ? url.img[1] : false
        this.src = img
        this.newurl = img
        this.enabled = enabled
      })
    },

    // Check
    imgucheck(url) {
      let imgurl = this.newurl
      if (/imgur/.test(url) && !/i\.imgur/.test(url))
        imgurl = imgurl.replace('imgur', 'i.imgur') + '.png'
      return imgurl
    },

    // Save
    saveImage() {
      chrome.storage.local.set({
        img: [this.imgucheck(this.newurl), this.enabled]
      })
      this.loadImage()
    }
  },

  created() {
    this.loadImage()
    this.src = 'https://i.imgur.com/8AoVUG0.png'
  }
}
</script>

<style lang="scss" scoped>
$primary: #5b76b5;

.content {
  padding: 20px;
}

.switch-container {
  display: flex;
  #enabled {
    margin-right: 10px;
  }
}

.image {
  margin: 20px 0;
  width: 100%;
  height: 260px;
  border: 1px solid $primary;
}

.input-group {
  display: grid;
  grid-gap: 15px;
  padding-bottom: 10px;
}
</style>
