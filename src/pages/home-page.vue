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

        <f7-swiper
          pagination
          :params="{
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 2000
          }"
        >
          <f7-swiper-slide>Slide 1</f7-swiper-slide>
          <f7-swiper-slide>Slide 2</f7-swiper-slide>
          <f7-swiper-slide>Slide 3</f7-swiper-slide>
        </f7-swiper>

        <div class="sudoku-grids">
          <a href="workplan" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="" alt="1">
              </div>
              <p class="sudoku-grid__label">工作计划</p>
          </a>
          <a href="contacts" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="" alt="2">
              </div>
              <p class="sudoku-grid__label">通讯录</p>
          </a>
          <a href="conf" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="" alt="3">
              </div>
              <p class="sudoku-grid__label">会务</p>
          </a>
          <a href="javascript:;" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="" alt="4">
              </div>
              <p class="sudoku-grid__label">Grid</p>
          </a>
          <a href="javascript:;" class="sudoku-grid">
              <div class="sudoku-grid__icon">
                  <img src="" alt="5">
              </div>
              <p class="sudoku-grid__label">Grid</p>
          </a>
        </div>

      </f7-page>
    </f7-pages>
  </f7-view>
  <f7-view v-else id="main-view" navbar-through :dynamic-navbar="true" main>
    <!-- iOS Theme Navbar -->
    <f7-navbar v-if="$theme.ios" style="z-index:0;">
    </f7-navbar>
    <f7-pages>
      <!-- <comp-list></comp-list> -->
      <workplan></workplan>
    </f7-pages>
  </f7-view>
</template>

<script>
import CompList from '@/pages/comp-list.vue'
import Workplan from '@/pages/workplan-option.vue'

export default {
  data () {
    return {
      mainTitle: '南土资产',//公司列表，工作计划
      isDev: process.env.NODE_ENV === 'development',
      // isProd: process.env.NODE_ENV === 'production'
    }
  },
  components: {
    compList: CompList,
    workplan: Workplan
  }
}
</script>
