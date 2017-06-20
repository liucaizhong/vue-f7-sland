<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Main Views -->
    <f7-views>
      <!-- <comp-list></comp-list> -->
      <home></home>
      <add-contact :popupId="popupId" :popupTitle="popupTitle"></add-contact>
    </f7-views>

  </div>
</template>

<script>
import Home from '@/pages/home.vue'
// import CompList from '@/pages/comp-list.vue'
import AddContact from '@/pages/add-contact.vue'

export default {
  data () {
    return {
      popupId: 'add-contact',
      popupTitle: '新建联系人',
    }
  },
  components: {
    home: Home,
    addContact: AddContact,
    // compList: CompList
  }
}
</script>
