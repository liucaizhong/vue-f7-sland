<template lang="html">
<f7-page class="research-plan">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link @click="onBack">
        <f7-icon v-show="!editing" icon="icon-back" class="m-r-7">
        </f7-icon>
        {{backTitle}}
      </f7-link>
    </f7-nav-left>
    <f7-nav-center>{{mainTitle}}</f7-nav-center>
    <f7-nav-right>
      <f7-link @click="onEdit">{{editTitle}}</f7-link>
    </f7-nav-right>
  </f7-navbar>
</f7-page>
</template>

<script>
export default {
  data () {
    return {
      editing: false,
      mainTitle: '调研计划'
    }
  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
    },
    blockTitle: function () {
      return this.editing ? '编辑信息' : '详细信息'
    }
  },
  methods: {
    onBack () {
      if(this.editing) {
        this.editing = !this.editing
      }
      else {
        this.$router.back()
      }
    },
    onEdit () {
      this.editing = !this.editing
    },
  }
}
</script>
