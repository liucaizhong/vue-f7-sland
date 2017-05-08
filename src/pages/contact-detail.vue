<template lang="html">
  <f7-page>
    <f7-navbar back-link="通讯录" sliding></f7-navbar>
    <f7-block-title>详细信息</f7-block-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>姓名</f7-label>
        <f7-input type="text" placeholder="姓名" :value="detail.name" readonly></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>行业</f7-label>
        <f7-input type="text" placeholder="行业" :value="detail.indus" readonly></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>职称</f7-label>
        <f7-input type="text" placeholder="职称" :value="detail.grade" readonly></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>电话</f7-label>
        <f7-input type="tel" placeholder="电话" :value="detail.phone" readonly></f7-input>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  computed: {
    detail: function () {
      let comp = this.$route.params.comp
      let id = this.$route.params.id
      let infos = this.$store.state.contacts[comp]

      let info = infos.find((cur) => {
        return cur.id === id
      })

      return {
        name: info.name,
        indus: info.indus,
        grade: info.grade,
        phone: info.phone
      }
    }
  }
}
</script>
