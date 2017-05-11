<template>
  <!-- Contacts -->
<f7-block class="search-content">
  <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>

    <!-- Search-through list -->
    <f7-list class="searchbar-found m-t-0"
      media-list
      :id="searchList"
      :no-hairlines="true"
    >
      <f7-list-group v-for="(group, key) in updatedContacts" :id="key">
        <f7-list-item :title="key" group-title></f7-list-item>
        <f7-list-item
          v-for="detail in group"
          :title="detail.name"
          :subtitle="detail.comp"
          :text="detail.indus"
          :link="'contacts/' + key + '/'+ detail.id">
        </f7-list-item>
      </f7-list-group>
    </f7-list>
    <ul class="contact-sorter">
      <li v-for="key in sorter"><a @click="scrollTo(key)">{{key}}</a></li>
    </ul>

</f7-block>
</template>

<script>
  export default {
    data () {
      return {
        sorter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z', '#'
                ]
      }
    },
    props: {
      'searchList': {
        type: String,
        default: 'search-list'
      }
    },
    computed: {
      updatedContacts: function () {
        return this.$store.state.contacts.contact
      }
    },
    methods: {
      scrollTo (divId) {
        console.log('begin to scroll')
        let el = document.querySelector('div.page-content')
        let scrollTo = document.getElementById(divId)
        el.scrollTop = scrollTo.offsetTop
      }
    }
  }
</script>
