<template lang="html">
  <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
    <!-- iOS Theme Navbar -->
    <f7-navbar v-if="$theme.ios">
      <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
    </f7-navbar>
    <!-- Pages -->
    <f7-pages>
      <f7-page>
        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
          <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
        </f7-navbar>

        <f7-card v-if="isDev">
          <f7-card-header>
            <f7-link href="workplan">工作计划</f7-link>
          </f7-card-header>
          <f7-card-content>
            <p>用于管理调研计划、个股报告计划、行业报告计划</p>
          </f7-card-content>
        </f7-card>
        <f7-card v-if="isDev">
          <f7-card-header>
            <f7-link href="contacts">外部通讯录</f7-link>
          </f7-card-header>
          <f7-card-content>
            <p>用于管理外部客户联系人信息</p>
          </f7-card-content>
        </f7-card>
        <!-- for future use: configuration -->
        <!-- <f7-fab color="blue" @click="doSomething">
          <f7-icon f7="add"></f7-icon>
        </f7-fab> -->
      </f7-page>
      <comp-list v-if="isProd"></comp-list>
    </f7-pages>
  </f7-view>
</template>

<script>
import CompList from '@/pages/comp-list.vue'

export default {
  data () {
    return {
      mainTitle: '南土资产',//公司列表，工作计划
      isDev: process.env.NODE_ENV === 'development',
      isProd: process.env.NODE_ENV === 'production'
    }
  },
  components: {
    compList: CompList
  }
}
</script>
