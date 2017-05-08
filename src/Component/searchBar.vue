<template>
  <!-- Search bar -->
<f7-block>
  <f7-searchbar
    cancel-link="取消"
    search-list="#search-list"
    :placeholder="placeholder"
    :clear-button="true"
    @searchbar:search="onSearch"
    @searchbar:enable="onEnable"
    @searchbar:disable="onDisable"
    @searchbar:clear="onClear"
    @blur="onBlur"
    :params="searchParams"
  ></f7-searchbar>

  <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Nothing found"></f7-list-item>
  </f7-list>

  <!-- Search-through list -->
  <f7-list class="searchbar-found"
    contacts
    id="search-list"
    no-hairlines="true"
  >
    <f7-list-group v-for="(group, key) in searchData">
      <f7-list-item :title="key" group-title></f7-list-item>
      <f7-list-item
        v-for="detail in group"
        :title="detail.name"
        :link="'/contacts/' + key + '/'+ detail.id">
      </f7-list-item>
    </f7-list-group>
  </f7-list>
</f7-block>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      'searchData': {
        type: Object
      },
      'placeholder': {
        type: String,
        default: '搜索'
      },
      'searchConditon': {
        type: Object,
      }
    },
    computed: {
      searchParams: function () {
        let params = Object.assign({
          searchList: '#search-list',
          searchIn: '.item-title'
        }, this.searchConditon)

        return params
      }
    },
    methods: {
      onSearch (query, found) {
        console.log('search', query);
      },
      onClear (event) {
        console.log('clear');
      },
      onEnable (event) {
        console.log('enable');
      },
      onDisable (event) {
        console.log('disable');
      },
      onBlur (event) {
        let $$ = this.$$
        $$('.searchbar')[0].f7Searchbar.disable()
      }
    }
  }
</script>
