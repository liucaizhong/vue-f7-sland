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
        <f7-list-group v-for="(group, key) in contacts" :id="'user'+key">
          <f7-list-item :title="key" group-title></f7-list-item>
          <f7-list-item
            v-for="detail in group"
            :title="detail.name"
            :subtitle="detail.comp"
            :text="detail.indus"
            :link="'contacts/'+ compGroup + '/' + compName + '/' + key + '/'+ detail.id">
          </f7-list-item>
        </f7-list-group>
        <div class="contact-amount" v-show="!found">
          <div class="amount-desc">{{amount}} 位联系人</div>
        </div>
      </f7-list>

  </f7-block>
</template>

<script>
  export default {
    data () {
      return {
        compGroup: this.$route.params.g_comp,
        compName: this.$route.params.comp
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
      },
      'contacts': {
        type: Object,
      }
    },
    computed: {
      amount: function () {
        let amount = 0
        for (let k in this.contacts) {
          amount += this.contacts[k].length
        }
        return amount
      }
    }
  }
</script>
