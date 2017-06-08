<template lang="html">
  <div class="work-plan">
    <f7-block-title>
      <div @click.prevent.stop="onAdd($event)" class="add-btn">
        <f7-icon
          v-show="editing"
          f7="add_round_fill"
          size="22px"
          color="green">
        </f7-icon>
      </div>
      {{planTitle}}
      <div v-if="!planItemsLength">{{subTitle}}</div>
    </f7-block-title>
    <f7-list accordion>
      <f7-list-item
        accordion-item
        v-for="(value, key) in planItems"
        v-if="value !== undefined"
        :title="(value[formContent[1].name] || '')+' '+(value[formContent[0].name] || '')"
        :data-id="value.id"
        :data-idx="key"
        :data-type="planType"
        class="li-transition"
        @accordion:open="onOpen($event)"
        @accordion:close="onClose($event)"
      >
        <div slot="media" @click.prevent.stop="onDel($event)">
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
          @click.stop="onConfirmDel($event)"
          :data-idx="key"
          v-show="showDelBtn"
        >
          删除
        </div>
        <f7-accordion-content>
          <f7-block>
            <f7-list form>
              <f7-list-item v-for="value in formContent">
                <f7-label>{{value.desc}}</f7-label>
                <f7-input type="text" :placeholder="value.desc" :name="value.name" :readonly="!editing"></f7-input>
              </f7-list-item>
            </f7-list>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
    </f7-list>
  </div>
</template>

<script>
import Common from '../tools.js'

export default {
  data () {
    return {
      showDelBtn: false,
      subTitle: '（待添加）'
    }
  },
  created () {
    // register global click event handler
    let $$ = this.$$
    $$(document).on('click', (e)=>{
      let delLi = $$("li.li-transition[style='transform: translateX(-60px);']")
      let isDelBtn = $$(e.target).hasClass('delete-btn')
      if(!isDelBtn && delLi.length) {
        console.log('delete cancel')
        e.preventDefault()
        e.stopImmediatePropagation()
        this.showDelBtn = false
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
    planItems: function () {
      return this.$store.state.workplan[this.planType].curPlan
    },
    planItemsLength: function () {
      return this.$store.state.workplan[this.planType].curPlan.length
    }
  },
  props: {
    planType: {
      type: String
    },
    editing: {
      type: Boolean,
      default: false
    },
    formContent: {
      type: Array
    },
    planTitle: {
      type: String
    }
  },
  methods: {
    onAdd (e) {
      console.log('add new research plan')
      // this.$router.loadPage('/workplan/'+t+'/new')
      // let date = new Date()
      // let year = date.getFullYear()
      // let month = date.getMonth()+1
      // month = month < 10 ? '0'+month: month
      // let day = date.getDate()
      // day = day < 10 ? '0'+day: day
      // let fullDate = [year, month, day].join('.')
      this.$store.commit('preparePlan', {
        method: 'insert',
        data: {
          id: undefined,
        },
        idx: undefined,
        type: this.planType
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
        console.dir(Common)
        if(!Common.isSameObject(preFormDataObj, curFormDataObj)) {
          console.log('update begin')
          target.setAttribute('data-content', JSON.stringify(curFormDataObj))
          this.$store.commit('preparePlan', {
            method: 'update',
            data: curFormDataObj,
            idx: dataAttr.idx,
            type: dataAttr.type
          })
        }
      }
      console.dir(e.target)
    },
    onDel (e) {
      this.showDelBtn = true
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
        this.$store.commit('preparePlan', {
          method: 'delete',
          data: {
            id: dataAttr.id
          },
          idx: dataAttr.idx,
          type: dataAttr.type
        })
      })
    },
  }
}
</script>
