<template lang="html">

  <f7-searchbar
    cancel-link="取消"
    :search-list="searchList"
    :placeholder="placeholder"
    :clear-button="true"
    @searchbar:search="onSearch"
    @searchbar:enable="onEnable"
    @searchbar:disable="onDisable"
    @searchbar:clear="onClear"
    @blur="onBlur"
    :params="searchParams"
    :form="false"
  ></f7-searchbar>

</template>

<script>
export default {
  props: {
    'placeholder': {
      type: String,
      default: '搜索'
    },
    'searchConditon': {
      type: Object
    },
    'searchList': {
      type: String,
      default: '#search-list'
    }
  },
  computed: {
    searchParams: function () {
      let params = Object.assign({
        searchList: this.searchList,
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
