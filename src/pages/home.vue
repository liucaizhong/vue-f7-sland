<template lang="html">
  <f7-view
    v-if="isDev"
    id="main-view"
    navbar-through
    :dynamic-navbar="true"
    main
  >
    <!-- iOS Theme Navbar -->
    <f7-navbar v-if="$theme.ios">
      <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
    </f7-navbar>
    <!-- Pages -->
    <f7-pages>
      <home-page></home-page>
    </f7-pages>
  </f7-view>
  <f7-view v-else id="main-view" navbar-through :dynamic-navbar="true" main>
    <!-- iOS Theme Navbar -->
    <f7-navbar v-if="$theme.ios">
      <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
    </f7-navbar>
    <f7-pages>
      <!-- <comp-list></comp-list> -->
      <workplan></workplan>
      <!-- <auto-conf></auto-conf> -->
    </f7-pages>
  </f7-view>
</template>

<script>
import CompList from '@/pages/comp-list.vue'
import Workplan from '@/pages/workplan-option.vue'
import AutoConf from '@/pages/auto-conf.vue'
import HomePage from '@/pages/home-page.vue'

export default {
  data () {
    return {
      mainTitle: '' || '微投研',// 南土资产，公司列表，工作计划, 活动预告
      isDev: process.env.NODE_ENV === 'development',
      // isProd: process.env.NODE_ENV === 'production'
    }
  },
  components: {
    compList: CompList,
    workplan: Workplan,
    autoConf: AutoConf,
    homePage: HomePage,
  },
}
</script>
