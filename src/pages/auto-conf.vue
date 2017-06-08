<template lang="html">
  <f7-page class="auto-conf">
    <!-- Material Theme Navbar -->
    <f7-navbar sliding>
      <f7-nav-left>
        <f7-link back>
          <f7-icon icon="icon-back">
          </f7-icon>
          &nbsp;{{backTitle}}
        </f7-link>
      </f7-nav-left>
      <f7-nav-center>{{mainTitle}}</f7-nav-center>
    </f7-navbar>

    <f7-block-title>会议时间</f7-block-title>
    <f7-list form id="sel-range">
      <f7-list-item>
        <f7-input
          type="text"
          placeholder="选择会议的时间范围"
          readonly
          id="date-range"
          name="date-range"
        />
      </f7-list-item>
    </f7-list>

    <f7-block>
      <f7-button fill color="blue" @click="onGenPic($event)">生成截图</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data () {
    return {
      backTitle: '返回',
      mainTitle: '会务',
      dateRange: undefined
    }
  },
  mounted () {
    let f7 = this.$f7
    this.dateRange = f7.calendar({
        input: '#date-range',
        dateFormat: 'M dd yyyy',
        rangePicker: true,
        closeOnSelect: true
    })
  },
  methods: {
    onGenPic (e) {
      console.log('generate picture begin')
      // get date obj
      let begin = this.dateRange.value[0]
      let end = this.dateRange.value[1]
      // axios get data and generate picture
      // to do later
    }
  }
}
</script>
