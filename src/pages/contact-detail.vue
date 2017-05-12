<template lang="html">
  <f7-page>
    <f7-navbar sliding>
      <f7-nav-left>
        <f7-link @click="onBack"><f7-icon v-show="!this.editing" icon="icon-back" class="m-r-7"></f7-icon>{{backTitle}}</f7-link>
      </f7-nav-left>
      <f7-nav-right>
        <f7-link @click="onEdit">{{editTitle}}</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title class="m-t-15">{{blockTitle}}</f7-block-title>
    <f7-list form id="detail-form">
      <f7-list-item>
        <f7-label>姓名</f7-label>
        <f7-input type="text" placeholder="姓名" v-model="name" name="name" :readonly="!editing"></f7-input>
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
        <f7-input type="text" placeholder="公司" v-model="comp" name="comp" :readonly="!editing"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>行业</f7-label>
        <f7-input type="text" placeholder="行业" v-model="indus" name="indus" :readonly="!editing"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>职称</f7-label>
        <f7-input type="text" placeholder="职称" v-model="grade" name="grade" :readonly="!editing"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>电话</f7-label>
        <f7-input v-if="editing" type="tel" placeholder="电话" v-model="phone" name="phone" :readonly="!editing"></f7-input>
        <f7-input v-else type="tel" placeholder="电话" v-model="phone" name="phone" readonly>
          <a :href="'tel:'+phone" class="external">{{phone}}</a>
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
    <f7-block v-show="editing" inner class="delete-btn">
      <f7-link @click="onDel">删除联系人</f7-link>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data () {
    return {
      contacts: this.$store.state.contacts.contact,
      params: {
        group: this.$route.params.group,
        id: this.$route.params.id
      },
      editing: false,
      defaultBackTitle: '',
      defaultEditTitle: '',
      defaultBlockTitle: '',
      name: '',
      comp: '',
      indus: '',
      grade: '',
      phone: '',
      nameError: false,
      nameErrMsg: '',
      nameInput: '',
      phoneError: false,
      phoneErrMsg: '',
      phoneInput: ''
    }
  },
  beforeMount () {
    let formData = ((contacts, group, id)=> {
      let infos = contacts[group]

      let info = infos.find((cur) => {
        return cur.id === id
      })
      return {
        name: info.name,
        comp: info.comp,
        indus: info.indus,
        grade: info.grade,
        phone: info.phone
      }
    })(this.contacts, this.params.group, this.params.id)

    this.name = formData.name
    this.comp = formData.comp
    this.indus = formData.indus
    this.grade = formData.grade
    this.phone = formData.phone
  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '通讯录'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
    },
    blockTitle: function () {
      return this.editing ? '编辑信息' : '详细信息'
    }
  },
  methods: {
    onBack () {
      if(this.editing) {
        this.editing = !this.editing
      }
      else {
        this.$router.back()
      }
      //clear error
      this.nameError = false
      this.phoneError = false
    },
    onDel () {
      let f7 = this.$f7
      let store = this.$store
      let router = this.$router
      let group = this.params.group
      let id = this.params.id
      let buttons1 = [
          {
              text: '删除联系人',
              color: 'red',
              onClick: function() {
                store.commit('delContact', {
                  key: group,
                  id: id
                })
                router.back()
              }
          }
      ];
      let buttons2 = [
          {
              text: '取消'
          }
      ];
      let groups = [buttons1, buttons2];
      f7.actions(groups);
    },
    confirmDel () {

    },
    onEdit () {
      if(this.editing) {
        if(!this.name) {
          this.nameError = true
          this.nameErrMsg = '不能为空'
        }
        else {
          this.nameError = false
        }
        if(!this.phone) {
          this.phoneError = true
          this.phoneErrMsg = '不能为空'
        }
        else {
          let r = /^1[34578]\d{9}$/.test(this.phone)
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
          let formData = f7.formToData('#detail-form')
          let group = this.params.group
          let id = this.params.id
          Object.assign(formData, {
            id: id
          })
          let willUpdateDetail = {
            [group]: formData
          }

          this.$store.commit('updateContacts', {
            willUpdateDetail: willUpdateDetail
          })
        }
      }
      if(!this.nameError && !this.phoneError) {
        this.editing = !this.editing
      }
    }
  }
}
</script>
