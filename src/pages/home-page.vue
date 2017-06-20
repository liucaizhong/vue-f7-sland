<template lang="html">
  <f7-page class="home-page">
    <!-- Material Theme Navbar -->
    <f7-navbar sliding>
      <f7-nav-center>{{mainTitle}}</f7-nav-center>
    </f7-navbar>

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
</template>

<script>
export default {
  data () {
    return {
      mainTitle: '' || '微投研',// 南土资产，公司列表，工作计划, 活动预告
    }
  }
}
</script>
