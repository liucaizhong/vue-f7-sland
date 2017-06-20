<template lang="html">
<f7-page class="conf-image">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link back>
        <f7-icon icon="icon-back">
        </f7-icon>
        &nbsp;{{backTitle}}
      </f7-link>
    </f7-nav-left>
    <f7-nav-center>{{mainTitle}}</f7-nav-center>
  </f7-navbar>
  <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
  </f7-preloader>
  <div class="image-content" v-show="!loading">
    <header class="header">
      <span class="rangeTitle">{{rangeTitle}}</span>
    </header>
    <div class="content">
      <ul>
        <li
          v-for="(value, key) in imageData"
          class="outer-li"
          v-if="!isEmpty(value)"
        >
          <header>
              <div class="date">
                  <span>{{getDayString(key)}}</span>
                  <br>
                  <span>{{getDateString(key)}}</span>
              </div>
          </header>
          <ul>
              <li v-for="item in value" class="inner-li" v-if="item">
                  <div class="infos">
                      <h2 class="title">{{item.title}}</h2>
                      <div class="row-0">
                        <span class="time">
                          <label>时间：</label>{{item.time}}
                        </span>
                        <span class="place" v-if="item.place">
                          <label>地点：</label>{{item.place}}
                        </span>
                        <span class="dial" v-if="item.dial">
                          <label>电话：</label>{{item.dial}}
                        </span>
                      </div>
                      <div class="row-1">
                        <span class="guest">
                          <label>嘉宾：</label>{{item.guests}}
                        </span>
                      </div>
                      <div class="row-2">
                        <span class="contacts">
                          <label>联系人：</label>{{getContactsString(item.contacts)}}
                        </span>
                      </div>
                  </div>
              </li>
          </ul>
        </li>
      </ul>
    </div>
    <footer class="footer">
    </footer>
  </div>
</f7-page>
</template>

<script>
import Common from '../tools.js'

export default {
  data () {
    return {
      loading: false,
      backTitle: '返回',
      mainTitle: '活动预告',
      beginDate: '',
      endDate: ''
    }
  },
  computed: {
    rangeTitle: function () {
      return `${this.beginDate.month}月${this.beginDate.day}日-${this.endDate.month}月${this.endDate.day}日`
    },
    imageData: function () {
      return this.$store.state.conference.conf_list
    }
  },
  methods: {
    getDayString (str) {
      let date = new Date(str.substr(0, 4), str.substr(4, 2), str.substr(6, 2))
      return '星期'+ (function(day) {
        switch (day) {
          case 0:
            return '日'
            break
          case 1:
            return '一'
            break
          case 2:
            return '二'
            break
          case 3:
            return '三'
            break
          case 4:
            return '四'
            break
          case 5:
            return '五'
            break
          case 6:
            return '六'
            break
        }
      })(date.getDay())
    },
    getDateString(str) {
      return +str.substr(4, 2)+'月'+(+str.substr(6, 2))+'日'
    },
    getContactsString(contacts) {
      return contacts.map((cur) => {
        return cur.person+cur.phone
      }).join('/')
    },
    isEmpty(obj) {
      return Common.isEmptyObject(obj)
    }
  },
  mounted () {
    let query = this.$route.options.query
    // console.dir(query)
    // this.beginDate = {
    //   month: +query.begin.substr(4,2),
    //   day: +query.begin.substr(6,2)
    // }
    // this.endDate =  {
    //   month: +query.end.substr(4,2),
    //   day: +query.end.substr(6,2)
    // }
    this.beginDate = {
      month: query.begin.getMonth()+1,
      day: query.begin.getDate()
    }
    this.endDate =  {
      month: query.end.getMonth()+1,
      day: query.end.getDate()
    }
  }
}
</script>
