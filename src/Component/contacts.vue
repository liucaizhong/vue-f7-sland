<template>
  <!-- Contacts -->
<!-- <div> -->
  <f7-block class="search-content">
    <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
      <f7-list class="searchbar-not-found">
        <f7-list-item title="Nothing found"></f7-list-item>
      </f7-list>

      <!-- Search-through list -->
      <f7-list class="searchbar-found m-t-0 search-result"
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
        <div class="contact-amount" v-show="!found">
          <div class="amount-desc">{{amount}} 位联系人</div>
        </div>
      </f7-list>

  </f7-block>
  <!-- <div class="contact-sorter-container">
    <ul class="contact-sorter">
      <li v-for="key in sorter"><a @click="scrollTo(key)">{{key}}</a></li>
    </ul>
  </div> -->
<!-- </div> -->
</template>

<script>
  export default {
    data () {
      return {
        // sorter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        //         'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        //         'U', 'V', 'W', 'X', 'Y', 'Z', '#'
        //       ]
      }
    },
    props: {
      'searchList': {
        type: String,
        default: 'search-list'
      },
      'found': {
        type: Number,
        default: 0
      }
    },
    computed: {
      updatedContacts: function () {
        return this.$store.state.contacts.contact
      },
      amount: function () {
        let amount = 0
        for (let k in this.updatedContacts) {
          amount += this.updatedContacts[k].length
        }
        return amount
      }
    },
    methods: {
      // scrollTo (divId) {
      //   let el = document.querySelector('div.page-content')
      //   let scrollTo = document.getElementById(divId)
      //   el.scrollTop = scrollTo.offsetTop
      // }
    }
  }
</script>
