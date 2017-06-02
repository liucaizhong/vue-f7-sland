<template lang="html">
<f7-page class="workplan">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link @click="onBack">
        <f7-icon v-show="!editing" icon="icon-back" class="m-r-7">
        </f7-icon>
        {{backTitle}}
      </f7-link>
    </f7-nav-left>
    <f7-nav-center>{{mainTitle}}</f7-nav-center>
    <f7-nav-right>
      <f7-link @click="onEdit">{{editTitle}}</f7-link>
    </f7-nav-right>
  </f7-navbar>
  <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
  </f7-preloader>
  <f7-block-title>筛选条件</f7-block-title>
  <f7-list form id="workplan-form">
    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="部门"
      v-if="hasAuthority"
    >
      <!-- <f7-label>部门</f7-label> -->
      <select name="dep" v-model="dep">
        <!-- <option value="" data-default disabled>部门</option> -->
        <option value="0">投资部</option>
        <option value="1">研究部</option>
        <option value="2">固收部</option>
        <option value="3">投资2部</option>
        <option value="4">研究2部</option>
        <option value="5">固收2部</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="员工"
      v-if="hasAuthority"
    >
      <!-- <f7-label>人员</f7-label> -->
      <select name="emp" v-model="emp">
        <!-- <option value="" data-default disabled>人员</option> -->
        <option value="0">刘一</option>
        <option value="1">刘二</option>
        <option value="2">刘三</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="年度"
    >
      <!-- <f7-label>年度</f7-label> -->
      <select name="year" v-model="year">
        <!-- <option value="" data-default disabled>年度</option> -->
        <option value="0">{{curYear-1}}</option>
        <option value="1">{{curYear}}</option>
        <option value="2">{{curYear+1}}</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="季度"
    >
      <!-- <f7-label>季度</f7-label> -->
      <select name="quarter" v-model="quarter">
        <!-- <option value="" data-default disabled>季度</option> -->
        <option value="0">第一季度</option>
        <option value="1">第二季度</option>
        <option value="2">第三季度</option>
        <option value="3">第四季度</option>
      </select>
    </f7-list-item>
  </f7-list>

  <f7-block-title>
    <div @touchstart.prevent.stop="onAdd($event)" class="add-btn">
      <f7-icon
        v-show="editing"
        f7="add_round_fill"
        size="22px"
        color="green">
      </f7-icon>
    </div>
    调研计划
  </f7-block-title>
  <!-- :link="'/workplan/'+type[0]+'/'+key+'?edit='+editing" -->
  <f7-list accordion>
    <f7-list-item
      accordion-item
      v-for="(value, key) in resPlanItems"
      v-if="value !== undefined"
      :title="value.date+' '+value.comp"
      :data-id="value.id"
      :data-idx="key"
      :data-type="types[0]"
      class="li-transition"
      @accordion:open="onOpen($event)"
      @accordion:close="onClose($event)"
    >
      <div slot="media" @touchstart.prevent.stop="onDel($event)">
        <f7-icon
          v-show="editing"
          f7="delete_round_fill"
          class="m-r-7"
          size="22px"
          color="red"
        >
        </f7-icon>
      </div>
      <div
        slot="root"
        class="delete-btn"
        @touchstart.stop="onConfirmDel($event)"
        :data-idx="key"
        :data-arr="'resplan'"
      >
        删除
      </div>
      <f7-accordion-content>
        <f7-block>
          <f7-list form>
            <f7-list-item>
              <f7-label>公司名称</f7-label>
              <f7-input type="text" placeholder="公司名称" name="comp" :readonly="!editing"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>预计调研时间</f7-label>
              <f7-input type="text" placeholder="预计调研时间" name="date" :readonly="!editing"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>预期看点</f7-label>
              <f7-input type="text" placeholder="预期看点" name="event" :readonly="!editing"></f7-input>
            </f7-list-item>
          </f7-list>
        </f7-block>
      </f7-accordion-content>
    </f7-list-item>
  </f7-list>

  <f7-block-title>
    <f7-icon
      v-show="editing"
      f7="add_round_fill"
      size="22px"
      color="green">
    </f7-icon>
    个股报告计划
  </f7-block-title>
  <f7-list>
    <f7-list-item
      v-for="item in items"
      :title="'Item ' + item"
      :link="'/'+item">
      <div slot="media">
        <f7-icon
          v-show="editing"
          f7="delete_round_fill"
          class="m-r-7"
          size="22px"
          color="red">
        </f7-icon>
      </div>
    </f7-list-item>
  </f7-list>

  <f7-block-title>
    <f7-icon
      v-show="editing"
      f7="add_round_fill"
      size="22px"
      color="green">
    </f7-icon>
    行业报告计划
  </f7-block-title>
  <f7-list>
    <f7-list-item
      v-for="item in items"
      :title="'Item ' + item"
      :link="'/'+item">
      <div slot="media">
        <f7-icon
          v-show="editing"
          f7="delete_round_fill"
          class="m-r-7"
          size="22px"
          color="red">
        </f7-icon>
      </div>
    </f7-list-item>
  </f7-list>

</f7-page>
</template>

<script>
import { PLANTYPES } from '../constant.js'

export default {
  data () {
    return {
      mainTitle: '工作计划',
      loading: false,
      dep: '',
      emp: '',
      year: '1',
      quarter: '',
      editing: false,
      deleting: false,
      items: [1, 2, 3, 4, 5],//for dev
      hasAuthority: true,
      types: PLANTYPES,
    }
  },
  created () {
    // get loginfo and workplan
    // to do further
    this.$store.commit('init', {
      [this.types[0]]: [{
        id: '001',
        comp: '中航机电',
        date: '2017.12.01',
        event: '期待上涨'
      },{
        id: '002',
        comp: '中航飞机',
        date: '2017.11.01',
        event: '期待上涨'
      },{
        id: '003',
        comp: '中直股份',
        date: '2017.10.01',
        event: '期待上涨'
      }],
      [this.types[1]]: [],
      [this.types[2]]: []
    })
    // set current quarter
    this.quarter = this.curQuarter
    // register global touchstart event handler
    let $$ = this.$$
    $$(document).on('touchstart', (e)=>{
      let delLi = $$("li.li-transition[style='transform: translateX(-60px);']")
      let isDelBtn = $$(e.target).hasClass('delete-btn')
      if(!isDelBtn && delLi.length) {
        console.log('delete cancel')
        e.preventDefault()
        e.stopImmediatePropagation()
        Array.prototype.forEach.call(delLi, (cur)=>{
          cur.style.transform = 'translateX(0)'
        })
      }
    }, {
      capture: true,
      passive: false
    })
  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
    },
    curYear: function () {
      let date = new Date()
      return date.getFullYear()
    },
    curQuarter: function () {
      let date = new Date()
      return Math.floor(date.getMonth()/3)
    },
    resPlanItems: function () {
      return this.$store.state.workplan[this.types[0]].curPlan
    }
  },
  methods: {
    onEdit () {
      let expandedAccordion = document.querySelectorAll('li.accordion-item-expanded')
      if(expandedAccordion.length) {
        let f7 = this.$f7
        f7.accordionClose(expandedAccordion)
      }
      if(this.editing) {
        // axios send request
        // todo...
        this.$store.commit('save')
        this.editing = !this.editing
      }
      else {
        this.editing = !this.editing
      }
    },
    onBack () {
      let expandedAccordion = document.querySelectorAll('li.accordion-item-expanded')
      if(expandedAccordion.length) {
        let f7 = this.$f7
        f7.accordionClose(expandedAccordion)
      }
      if(this.editing) {
        this.editing = !this.editing
        this.$store.commit('cancel')
      }
      else {
        this.$router.back()
      }
    },
    onDel (e) {
      let parentLi = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
      console.dir(parentLi)
      parentLi.style.transform = 'translateX(-60px)'
    },
    onConfirmDel (e) {
      let delLi = e.target.parentElement
      let delUl = delLi.parentElement
      let dataAttr = delLi.dataset
      let delPromise = new Promise((resolve, reject)=>{
        delLi.setAttribute('class', 'animated fadeOutLeft')
        setTimeout(()=>{
          resolve()
        }, 300)
      })
      delPromise.then(()=>{
        delLi.removeAttribute('class')
        delLi.setAttribute('class', 'li-transition')
        delLi.style.transform = 'translateX(0px)'
        this.$store.commit('prepare', {
          method: 'delete',
          data: {
            id: dataAttr.id
          },
          idx: dataAttr.idx,
          type: dataAttr.type
        })
      })
    },
    onAdd (e) {
      console.log('add new research plan')
      // this.$router.loadPage('/workplan/'+t+'/new')
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()+1
      month = month < 10 ? '0'+month: month
      let day = date.getDate()
      day = day < 10 ? '0'+day: day
      let fullDate = [year, month, day].join('.')
      this.$store.commit('prepare', {
        method: 'insert',
        data: {
          id: undefined,
          comp: '',
          date: fullDate,
          event: ''
        },
        idx: undefined,
        type: this.types[0] //get from props
      })
    },
    onOpen (e) {
      console.log('open accordion')
      console.dir(e.target)
      let target = e.target
      let dataAttr = target.dataset
      let form = target.getElementsByTagName('FORM')[0]
      console.dir(form)
      let f7 = this.$f7
      let formData = this.$store.state.workplan[dataAttr.type].curPlan[dataAttr.idx]
      console.dir(formData)
      f7.formFromData(form, formData)
      if(!target.hasAttribute('data-content')) {
        target.setAttribute('data-content', JSON.stringify(formData))
      }
      console.dir(e.target)
    },
    onClose (e) {
      console.log('close accordion')
      console.log(this.editing)
      if(this.editing) {
        let target = e.target
        let dataAttr = target.dataset
        let id = dataAttr.id
        let idx = dataAttr.idx
        let form = target.getElementsByTagName('FORM')[0]
        let f7 = this.$f7
        let formData = f7.formToData(form)
        let curFormDataObj = Object.assign(formData, {
          id: id
        })
        let preFormData = target.dataset.content || '{}'
        let preFormDataObj = JSON.parse(preFormData)
        console.dir(curFormDataObj)
        console.dir(preFormDataObj)
        if(!this.isSameObject(preFormDataObj, curFormDataObj)) {
          console.log('update begin')
          target.setAttribute('data-content', JSON.stringify(curFormDataObj))
          this.$store.commit('prepare', {
            method: 'update',
            data: curFormDataObj,
            idx: dataAttr.idx,
            type: dataAttr.type
          })
        }
      }
      console.dir(e.target)
    },
    //compare plain object
    isSameObject (a, b) {
      if(Object.keys(a).length !== Object.keys(b).length) {
        return false
      }
      for(let k in a) {
        if(b[k] === undefined) {
          return false
        }
        if(a[k] !== b[k]) {
          return false
        }
      }
      return true
    }
  }
}
</script>
