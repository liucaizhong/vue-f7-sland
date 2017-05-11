<template lang="html">
  <f7-popup :id="popupId" tablet-fullscreen>
    <f7-view navbar-fixed>
      <f7-pages>
        <f7-page>
          <f7-navbar>
            <f7-nav-left>
              <f7-link @click="onClose" close-popup>{{navLeftTitle}}</f7-link>
            </f7-nav-left>
            <f7-nav-center>{{popupTitle}}</f7-nav-center>
            <f7-nav-right>
              <f7-link @click="onSave">{{navRightTitle}}</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-list form id="add-form">
            <f7-list-item>
              <f7-label>姓名</f7-label>
              <f7-input
                type="text"
                placeholder="姓名"
                name="name"
                v-model="nameInput"
              >
              </f7-input>
              <f7-input
                type="text"
                v-show="nameError"
                class="error-msg"
                readonly
              >{{nameErrMsg}}
              </f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>公司</f7-label>
              <f7-input
                type="text"
                placeholder="公司"
                name="comp"
              >
              </f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>行业</f7-label>
              <f7-input
                type="text"
                placeholder="行业"
                name="indus"
               >
               </f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>职称</f7-label>
              <f7-input
                type="text"
                placeholder="职称"
                name="grade"
              >
              </f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>电话</f7-label>
              <f7-input
                type="tel"
                placeholder="电话"
                name="phone"
                v-model="phoneInput"
              >
              </f7-input>
              <f7-input
                type="text"
                v-show="phoneError"
                class="error-msg"
                readonly
              >{{phoneErrMsg}}
              </f7-input>
            </f7-list-item>
          </f7-list>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-popup>
</template>

<script>
export default {
  data () {
    return {
      navLeftTitle: '取消',
      navRightTitle: '完成',
      nameError: false,
      nameErrMsg: '',
      nameInput: '',
      phoneError: false,
      phoneErrMsg: '',
      phoneInput: ''
    }
  },
  props: {
    popupId: {
      type: String
    },
    popupTitle: {
      type: String
    }
  },
  methods: {
    onSave () {
      if(!this.nameInput) {
        this.nameError = true
        this.nameErrMsg = '不能为空'
      }
      else {
        this.nameError = false
      }
      if(!this.phoneInput) {
        this.phoneError = true
        this.phoneErrMsg = '不能为空'
      }
      else {
        let r = /^1[34578]\d{9}$/.test(this.phoneInput)
        if(!r) {
          this.phoneError = true
          this.phoneErrMsg = '格式错误'
        }
        else {
          this.phoneError = false
        }
      }

      if(!this.nameError && !this.phoneError) {
        let f7 = this.$f7
        let formData = f7.formToData('#add-form')
        Object.assign(formData, {
          id: '10'
        })
        let willUpdateDetail = [formData]

        this.$store.commit('addContact', {
          key: 'C',
          data: willUpdateDetail
        })
        let clearForm = {
          'name': '',
          'comp': '',
          'indus': '',
          'grade': '',
          'phone': ''
        }
        f7.formFromData('#add-form', clearForm)
        f7.closeModal('#'+this.popupId)
      }
    },
    onClose () {
      let f7 = this.$f7
      let clearForm = {
        'name': '',
        'comp': '',
        'indus': '',
        'grade': '',
        'phone': ''
      }
      f7.formFromData('#add-form', clearForm);
      //clear error
      this.nameError = false
      this.phoneError = false
    }
  }
}
</script>

<style lang="css">
</style>
