<template lang="html">
  <f7-popup :id="popupId" tablet-fullscreen>
    <f7-view navbar-fixed>
      <f7-pages>
        <f7-page>
          <f7-navbar sliding>
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
import axios from 'axios'
import pinyin from '../plugins/pinyin.js'

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
        let url = process.env.NODE_ENV === 'production'
                  ? 'http://slandasset.applinzi.com/contacts/API/insert.php'
                  : 'http://localhost:3000/insertcontact'

        let pinyinOfName = pinyin.getCamelChars(this.nameInput)
        let postData = Object.assign({}, formData, {
          group: pinyinOfName[0]
        })
        axios.post(url, JSON.stringify(postData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then((response) => {
          console.log('response back!')
          console.dir(response)
          let res = JSON.parse(response.data)
          if(!res.msg.errcode) {
            this.$store.commit('initContact', {
              data: res.data
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
        })
        .catch((error) => {
          console.log(error)
        })
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
