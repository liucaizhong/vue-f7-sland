<template lang="html">
  <f7-toolbar>
    <f7-link
      v-for="link in currentLinks"
      :href="link.href"
      :text="link.text"
    >
      <component :is="link.iconTemplate">
      </component>
    </f7-link>
  </f7-toolbar>
</template>

<script>
export default {
  data () {
    return {
      linkSet: {
        'home': [{
          href: '/index.php',
          text: '首页',
          iconTemplate: 'homeIcon',
        }],
        'workplan-option': [{
          href: '/index.php',
          text: '首页',
          iconTemplate: 'homeIcon',
        }],
        'workplan-list': [{
          href: '/index.php',
          text: '首页',
          iconTemplate: 'homeIcon',
        }]
      }
    }
  },
  props: {
    page: {
      type: String,
      default: 'home'
    }
  },
  computed: {
    currentLinks: function () {
      return this.linkSet[this.page]
    },
  },
  components: {
    homeIcon: {
      template: '<f7-icon f7="home"></f7-icon>'
    }
  },
}
</script>
