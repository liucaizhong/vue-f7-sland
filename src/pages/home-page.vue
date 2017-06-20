<template lang="html">
  <f7-view v-if="isDev" id="main-view" navbar-through :dynamic-navbar="true" main>
    <!-- iOS Theme Navbar -->
    <f7-navbar v-if="$theme.ios">
      <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
    </f7-navbar>
    <!-- Pages -->
    <f7-pages>
      <f7-page class="home-page">
        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
          <f7-nav-center sliding>{{mainTitle}}</f7-nav-center>
        </f7-navbar>

        <!-- <f7-card>
          <f7-card-header>
            <f7-link href="workplan">工作计划</f7-link>
          </f7-card-header>
          <f7-card-content>
            <p>用于管理调研计划、个股报告计划、行业报告计划</p>
          </f7-card-content>
        </f7-card>
        <f7-card>
          <f7-card-header>
            <f7-link href="contacts">外部通讯录</f7-link>
          </f7-card-header>
          <f7-card-content>
            <p>用于管理外部客户联系人信息</p>
          </f7-card-content>
        </f7-card> -->

        <!-- pagination -->
        <!-- paginationClickable: true, -->
        <f7-swiper
          :params="{
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false
          }"
        >
        <!-- <f7-swiper :init="false"> -->
          <f7-swiper-slide class="slide_1"></f7-swiper-slide>
          <f7-swiper-slide class="slide_2">Slide 2</f7-swiper-slide>
          <f7-swiper-slide class="slide_3">Slide 3</f7-swiper-slide>
        </f7-swiper>

        <div class="sudoku-grids">
          <a href="" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="../../static/res-calendar.png" alt="">
              </div>
              <p class="sudoku-grid__label">投研日历</p>
          </a>
          <a href="" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="../../static/stock-recommend.png" alt="">
              </div>
              <p class="sudoku-grid__label">个股推荐</p>
          </a>
          <a href="" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="../../static/attend-calendar.png" alt="">
              </div>
              <p class="sudoku-grid__label">出勤日历</p>
          </a>
          <a href="workplan" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="../../static/workplan.png" alt="">
              </div>
              <p class="sudoku-grid__label">工作计划</p>
          </a>
          <a href="contacts" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="../../static/contacts.png" alt="">
              </div>
              <p class="sudoku-grid__label">通讯录</p>
          </a>
          <a href="conf" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="../../static/conference.png" alt="">
              </div>
              <p class="sudoku-grid__label">会务</p>
          </a>
        </div>

      </f7-page>
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
  },
  mounted () {
    // let f7 = this.$f7 || new Framework7()
    // let homeSwiper = f7.swiper('.swiper-container', {
    //   slidesPerView: 1,
    //   spaceBetween: 0,
    //   loop: true,
    //   autoplay: 2000,
    //   autoplayDisableOnInteraction: false,
    // })
  }
}
</script>
