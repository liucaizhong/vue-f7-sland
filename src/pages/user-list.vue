<template lang="html">

  <f7-page class="contact-content">
    <!-- Material Theme Navbar -->
    <f7-navbar sliding>
      <f7-nav-left>
        <f7-link back>
          <f7-icon icon="icon-back" class="m-r-7"></f7-icon>
          {{backTitle}}
        </f7-link>
      </f7-nav-left>
      <f7-nav-center>{{mainTitle}}</f7-nav-center>
    </f7-navbar>
    <f7-searchbar
      cancel-link="取消"
      :search-list="'#'+searchList"
      :placeholder="placeholder"
      :clear-button="true"
      @searchbar:search="onSearch"
      @blur="onBlur"
      :params="searchParams"
      :form="false"
    ></f7-searchbar>
    <contacts
      :searchList="searchList"
      :found="found"
      :contacts="contacts"
    >
    </contacts>
    <!-- <add-contact :popupId="popupId" :popupTitle="popupTitle"></add-contact> -->
    <f7-toolbar bottom>
      <f7-link class="btn-add" :open-popup="'#'+popupId"><f7-icon f7="add"></f7-icon></f7-link>
    </f7-toolbar>
    <div slot="fixed">
      <sorter :sorter="sorter" :parent="'user'"></sorter>
    </div>
  </f7-page>

</template>

<script>
import Contacts from '@/Component/contacts.vue'
// import AddContact from '@/pages/add-contact.vue'
import Sorter from '@/Component/sorter.vue'

export default {
  data () {
    return {
      placeholder: '搜索',
      searchList: 'search-list',
      searchConditon: {
        searchIn: '.item-title, .item-subtitle, .item-text'
      },
      popupId: 'add-contact',
      // popupTitle: '新建联系人',
      found: 0,
      backTitle: '返回',
      mainTitle: '联系人列表'
    }
  },
  methods: {
    onSearch (query, found) {
      this.found = found.length
    },
    onBlur (event) {
      let $$ = this.$$
      let el = $$('.searchbar')[0].f7Searchbar

      if(!el.query) {
        el.disable()
      }
    }
  },
  computed: {
    searchParams: function () {
      let params = Object.assign({
        searchList: '#'+this.searchList,
        searchIn: '.item-title'
      }, this.searchConditon)

      return params
    },
    sorter: function () {
      let group = this.$route.params.g_comp
      let name = this.$route.params.comp

      return Object.keys(this.$store.state.contacts.contact[group][name]).sort()
    },
    contacts: function () {
      let group = this.$route.params.g_comp
      let name = this.$route.params.comp

      return this.$store.state.contacts.contact[group][name]
    }
  },
  components: {
    contacts: Contacts,
    // addContact: AddContact,
    sorter: Sorter
  }
}
</script>
