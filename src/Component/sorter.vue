<template lang="html">
  <div class="contact-sorter-container" >
    <ul class="contact-sorter"
      @touchstart="touchStartHandler"
      @touchmove="touchMoveHandler"
    >
      <li v-for="key in sorter"><a @click="scrollTo(key)">{{key}}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startPageY: 0,
      startKey: 0
    }
  },
  props: {
    sorter: {
      type: Array,
    },
    parent: {
      type: String,
      default: 'user'
    }
  },
  methods: {
    scrollTo (divId) {
      let el = document.querySelector('div.page-on-center>div.page-content')
      let scrollTo = document.getElementById(this.parent+divId)
      el.scrollTop = scrollTo.offsetTop
    },
    touchStartHandler (event) {
      if(event.targetTouches.length == 1) {
        // event.preventDefault();
        let touch = event.targetTouches[0]
        this.startPageY = touch.pageY
        this.startKey = this.sorter.indexOf(touch.target.innerText)
      }
    },
    touchMoveHandler (event) {
      if(event.targetTouches.length == 1) {
        event.preventDefault();
        let touch = event.targetTouches[0]
        let curPageY = touch.pageY
        let count = Math.floor((curPageY - this.startPageY)/16)
        let curKey = this.startKey + count
        let scrollTo = document.getElementById(this.parent+this.sorter[curKey])
        let el = document.querySelector('div.page-on-center>div.page-content')
        if(scrollTo) {
          el.scrollTop = scrollTo.offsetTop
        }
      }
    }
  }
}
</script>
