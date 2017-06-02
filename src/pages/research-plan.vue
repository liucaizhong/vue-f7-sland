<template lang="html">
<f7-page class="research-plan">
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
  <f7-block-title class="m-t-15">{{blockTitle}}</f7-block-title>
  <f7-list form id="research-plan-form">
    <f7-list-item>
      <f7-label>公司名称</f7-label>
      <f7-input type="text" placeholder="公司" v-model="comp" name="comp" :readonly="!editing"></f7-input>
    </f7-list-item>
    <f7-list-item>
      <f7-label>预计调研时间</f7-label>
      <f7-input type="text" placeholder="预计调研时间" v-model="date" name="date" :readonly="!editing"></f7-input>
    </f7-list-item>
    <f7-list-item>
      <f7-label>预期看点</f7-label>
      <f7-input type="text" placeholder="预期看点" v-model="event" name="event" :readonly="!editing"></f7-input>
    </f7-list-item>
  </f7-list>
</f7-page>
</template>

<script>
export default {
  data () {
    return {
      editing: false,
      mainTitle: '调研计划',
      comp: '',
      date: '',
      event: '',
      editingKey: '',
      id: ''
    }
  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
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
        let path = this.$route.path
        this.editingKey = path.split('/')[3]
        if(!this.editingKey.localeCompare('new')) {
          this.$router.back()
        }
        else {
          this.editing = !this.editing
        }
      }
      else {
        this.$router.back()
      }
    },
    onEdit () {
      if(this.editing) {
        let f7 = this.$f7
        let formData = f7.formToData('#research-plan-form')
        let postData = Object.assign({}, formData, {
          id: this.id,
          index: this.editingKey
        })
        console.dir(postData)
        let prepare = this.$route.query.edit
        console.log(prepare)
        if(prepare) {
          this.$store.commit('prepare', {
            method: 'update',
            data: postData,
            type: 'r'
          })
        }
        else {
          // let url = process.env.NODE_ENV === 'production'
          //           ? 'http://slandasset.applinzi.com/contacts/API/update.php'
          //           : 'http://localhost:3000/updatecontact'
          //
          // axios.post(url, JSON.stringify(postData),
          // {
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //   }
          // })
          // .then((response) => {
          //   console.log('response back!')
          //   console.dir(response)
          //   let res = JSON.parse(response.data)
          //   if(!res.msg.errcode) {
          //     this.$store.commit('initContact', {
          //       data: res.data
          //     })
          //     this.editing = !this.editing
          //   }
          //
          // })
          // .catch((error) => {
          //   console.log(error)
          // })

        }
      }
      this.editing = !this.editing
    },
  },
  created () {
    let path = this.$route.path
    this.editingKey = path.split('/')[3]
    if(!this.editingKey.localeCompare('new')) {
      this.editing = true
    }
    else {
      let resPlanData = this.$store.state.workplan.curResPlan[this.editingKey]
      let willUpdResPlan = this.$store.state.workplan.curResPlan[this.editingKey]
      this.comp = resPlanData.comp
      this.date = resPlanData.date
      this.event = resPlanData.event
      this.id = resPlanData.id
    }
  }
}
</script>
