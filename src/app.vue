<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <f7-page class="contact-content">
            <!-- Material Theme Navbar -->
            <f7-navbar v-if="$theme.material">
              <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
            </f7-navbar>
            <!-- <search-bar
              :searchConditon="searchConditon"
              :searchList="'#'+searchList"
            ></search-bar> -->
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
            >
            </contacts>
            <f7-toolbar bottom>
              <f7-link class="btn-add" :open-popup="'#'+popupId"><f7-icon f7="add"></f7-icon></f7-link>
            </f7-toolbar>
          </f7-page>
          <div class="contact-sorter-container" >
            <ul class="contact-sorter"
              @touchstart="touchStartHandler"
              @touchmove="touchMoveHandler"
            >
              <li v-for="key in sorter"><a @click="scrollTo(key)">{{key}}</a></li>
            </ul>
          </div>
        </f7-pages>

      </f7-view>
    </f7-views>

    <!-- Popup -->
    <add-contact :popupId="popupId" popupTitle="新建联系人"></add-contact>

  </div>
</template>

<script>
import Contacts from '@/Component/contacts.vue'
import AddContact from '@/pages/add-contact.vue'
// import SearchBar from '@/Component/search-bar.vue'
export default {
  data () {
    return {
      placeholder: '搜索',
      searchList: 'search-list',
      searchConditon: {
        searchIn: '.item-title, .item-subtitle, .item-text'
      },
      popupId: 'add-contact',
      found: 0,
      sorter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
              'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
              'U', 'V', 'W', 'X', 'Y', 'Z', '#'
      ],
      startPageY: 0,
      startKey: 0
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
    scrollTo (divId) {
      let el = document.querySelector('div.page-content')
      let scrollTo = document.getElementById(divId)
      el.scrollTop = scrollTo.offsetTop
    },
    touchStartHandler (event) {
      if(event.targetTouches.length == 1) {
        event.preventDefault();
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
        let scrollTo = document.getElementById(this.sorter[curKey])
        if(scrollTo) {
          document.querySelector('div.page-content').scrollTop = scrollTo.offsetTop
        }
      }
    }
  },
  computed: {
    mainTitle: function () {
      let title = '南土资产'
      return title
    },
    searchParams: function () {
      let params = Object.assign({
        searchList: '#'+this.searchList,
        searchIn: '.item-title'
      }, this.searchConditon)

      return params
    }
  },
  components: {
    contacts: Contacts,
    addContact: AddContact,
    // searchBar: SearchBar
  }
}
</script>
