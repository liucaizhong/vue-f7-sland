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
    <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
    </f7-preloader>
    <f7-block class="search-content">
      <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
        <f7-list class="searchbar-not-found">
          <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list>

        <!-- Search-through list -->
        <f7-list class="searchbar-found m-t-0 search-result"
          contacts
          :id="searchList"
          :no-hairlines="true"
        >
          <f7-list-group v-for="(group, key) in comps" :id="'comp'+key">
            <f7-list-item :title="key" group-title></f7-list-item>
            <f7-list-item
              v-for="name in group"
              :title="name"
              :link="'contacts/' + key + '/'+ name">
            </f7-list-item>
          </f7-list-group>

        </f7-list>

    </f7-block>
    <div slot="fixed">
      <sorter :sorter="sorter" :parent="'comp'"></sorter>
    </div>
  </f7-page>

</template>

<script>
import Sorter from '@/Component/sorter.vue'
import axios from 'axios'

export default {
  data () {
    return {
      placeholder: '搜索',
      searchList: 'search-list',
      searchConditon: {},
      // sorter: [],
      // comps: {},
      backTitle: '返回',
      mainTitle: '公司列表',
      loading: true
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
      return Object.keys(this.$store.state.contacts.contact).sort()
    },
    comps: function () {
      let obj = {}
      let data = this.$store.state.contacts.contact
      let keys = Object.keys(this.$store.state.contacts.contact).sort()
      keys.forEach((cur) => {
        obj[cur] = Object.keys(data[cur])
      })
      return {...obj}
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
    },
    // initSorter (keys) {
    //   this.sorter = this.sorter.concat(keys)
    // },
    initContacts (data) {
      this.$store.commit({
        type: 'initContact',
        data: data
      })
    },
    // initComps (keys, data) {
    //   let obj = {}
    //   keys.forEach((cur) => {
    //     obj[cur] = Object.keys(data[cur])
    //   })
    //   this.comps = {...obj}
    // console.dir(this.comps)
    // },
  },
  mounted () {
    let url = process.env.NODE_ENV === 'production'
              ? 'http://slandasset.applinzi.com/contacts/API/get.php'
              : 'http://localhost:3000/getcontact'

    axios.get(url)
    .then((response) => {
      let dataObj = response.data
      this.initContacts(dataObj)
      this.loading = false
      // this.initComps(Object.keys(dataObj), dataObj)
      // this.initSorter(Object.keys(dataObj))
    })
    .catch((error) => {
      console.log(error)
    })
  },
  components: {
    sorter: Sorter
  }
}
</script>
