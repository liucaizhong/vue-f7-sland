<template lang="html">
  <f7-page class="auto-conf">
    <!-- Material Theme Navbar -->
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

    <f7-block-title>会议时间</f7-block-title>
    <f7-list form id="sel-range">
      <f7-list-item>
        <f7-input
          type="text"
          placeholder="选择会议的时间范围"
          id="date-range"
          name="date-range"
          readonly
        />
      </f7-list-item>
    </f7-list>

    <f7-block>
      <f7-button fill color="blue" @click="onGenTable($event)">生成列表</f7-button>
    </f7-block>

    <div class="data-table data-table-init card" v-show="showTable">
      <!-- Card header -->
      <div class="card-header">
        <!-- Default table header -->
        <div class="data-table-header">
          <div class="data-table-title">会议列表</div>
          <div class="data-table-actions">
            <!-- to perfect further -->
            <a class="link icon-only" @click="onDownloadExcel($event)">
              <i class="icon f7-icons">cloud_download</i>
            </a>
            <a class="link icon-only" @click="onGenPic($event)">
              <i class="icon f7-icons">forward</i>
            </a>
          </div>
        </div>
        <!-- Selected table header -->
        <div class="data-table-header-selected">
          <div class="data-table-title-selected">
            <span class="data-table-selected-count"></span>
            条记录被选中
          </div>
          <div class="data-table-actions">
            <a class="link icon-only" @click="onDel($event)">
              <i class="icon f7-icons">trash</i>
            </a>
          </div>
        </div>
      </div>
      <div class="card-content">
        <table id="conf-table">
          <thead>
            <tr>
              <th class="checkbox-cell">
                <label class="form-checkbox">
                  <input type="checkbox"><i></i>
                </label>
              </th>
              <th class="label-cell">日期</th>
              <th class="label-cell">主题</th>
              <th class="label-cell">时间</th>
              <th class="label-cell">地点</th>
              <th class="label-cell">电话</th>
              <th class="label-cell">嘉宾</th>
              <th class="label-cell">联系人</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, index) in tableData"
              :data-idx="value.idx"
              :data-key="value.date"
            >
              <td class="checkbox-cell">
                <label class="form-checkbox">
                  <input type="checkbox"><i></i>
                </label>
              </td>
              <td class="label-cell">{{value.date}}</td>
              <td class="label-cell">{{value.title}}</td>
              <td class="label-cell">{{value.time}}</td>
              <td class="label-cell">{{value.place}}</td>
              <td class="label-cell">{{value.dial}}</td>
              <td class="label-cell">{{value.guests}}</td>
              <td class="label-cell">{{getContactsString(value.contacts)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </f7-page>

</template>

<script>
import axios from 'axios'
import xlsx from 'xlsx'

export default {
  data () {
    return {
      backTitle: '返回',
      mainTitle: '活动预告',
      dateRange: null,
      showTable: false,
      begin: '',
      end: '',
    }
  },
  computed: {
    tableData: function () {
      return this.objToTable(this.$store.state.conference.conf_list)
    }
  },
  mounted () {
    let f7 = this.$f7 || new Framework7()
    this.dateRange = f7.calendar({
        input: '#date-range',
        dateFormat: 'M dd yyyy',
        rangePicker: true,
        closeOnSelect: true
    })
  },
  methods: {
    onGenTable (e) {
      console.log('generate table begin')
      this.showTable = false
      // get date obj
      let dateRange = this.dateRange.value
      if(dateRange) {
        this.begin = dateRange[0]
        this.end = dateRange[1]
        let beginString = this.formatDate(this.begin)
        let endString = this.formatDate(this.end)

        // axios get data
        let url = process.env.NODE_ENV === 'production'
                  ? './convert.php'
                  : 'http://localhost:3000/getconference'

        axios.get(url, {
          params: {
            comp: '1',
            begin: beginString,
            end: endString
          }
        })
        .then((response) => {
          let dataObj = response.data
          console.dir(response)
          if (dataObj) {
            this.$store.commit('initConf', {
              data: dataObj
            })

            this.showTable = true
          }
          else {
            this.$f7.alert('没有会议记录！', '')
          }
        })
        .catch((error) => {
          console.log(error)
        })

      }

    },
    objToTable(obj) {
      let data = []
      for(let key in obj) {
        obj[key].forEach((cur, idx) => {
          if(cur) {
            data.push(Object.assign({}, cur, {
              date: key,
              idx: idx
            }))
          }
        })
      }
      return data
    },
    getContactsString(contacts) {
      return contacts.map((cur) => {
        return cur.person+cur.phone
      }).join('/')
    },
    onDel (e) {
      let selectedRow = document.querySelectorAll('.form-checkbox input[type=checkbox]:checked')
      // console.dir(selectedRow)
      if(selectedRow && selectedRow.length) {
        this.$$('div.data-table.data-table-init.card.data-table-has-checked').removeClass('data-table-has-checked')
        let prepare = []
        Array.prototype.forEach.call(selectedRow, (cur) => {
          cur.checked = false
          let tr = cur.parentElement.parentElement.parentElement
          let dataAttr = tr.dataset
          if(dataAttr.key || dataAttr.idx) {
            prepare.push(dataAttr)
          }

        })
        this.$store.commit('delConf', prepare)
      }

    },
    onGenPic (e) {
      if(this.tableData.length) {
        let router = this.$router || this.$f7.mainView.router
        // let url = `/confres?begin=${this.formatDate(this.begin)}&end=${this.formatDate(this.end)}`
        // console.log(url)
        // router.loadPage(url)
        router.load({
          url: 'confres',
          query: {
            begin: this.begin,
            end: this.end
          }
        })
      }
      else {
        this.$f7.alert('没有会议记录！', '')
      }
    },
    formatDate (obj) {
      let year = obj.getFullYear()
      let month = obj.getMonth() + 1
      month = month > 10 ? month : '0'+ month
      let day = obj.getDate()
      day = day > 10 ? day : '0' + day
      return year+month+day
    },
    onDownloadExcel (e) {
      console.log('begin download excel')
      // let htmltable= document.getElementById('conf-table')
      // let html = htmltable.outerHTML
      // window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html))

      // get data
      let tableData = this.tableData
      console.dir(tableData)
      // set xlsx's header, footer and column name
      let header = [`东方活动预告（${this.begin.getMonth() + 1}月${this.begin.getDate()}日`+
                  `-${this.end.getMonth() + 1}月${this.end.getDate()}日）`]
      let footer = ['请与各对口销售联系报名']
      let columnName = ['时间', '会议主题', '参会方式', '会议关键词']
      // new workbook
      console.dir(xlsx)
      let wb = xlsx.utils.book_new()
      // make worksheet data
      let ws_data = [header, columnName]
      // insert table row
      tableData.forEach((cur) => {
        let dateStr = `${+cur.date.substr(4, 2)}月${+cur.date.substr(6, 2)}日`
        let titleStr = cur.title || ''
        let contactStr = this.getContactsString(cur.contacts)
        let infos = `时间：${cur.time || ''}
地点：${cur.place || ''}
联系人：${contactStr || ''}`
        let guestStr = '嘉宾:'+ (cur.guests || '')
        ws_data.push([dateStr, titleStr, infos, guestStr])
      })
      ws_data.push(footer)
      // new worksheet
      let ws = xlsx.utils.aoa_to_sheet(ws_data)
      xlsx.utils.book_append_sheet(wb, ws, '活动预告')
      console.dir(wb)

      // write xlsx and download it
      let wopts = { bookType:'xlsx', bookSST:false, type:'binary' }

      let wbout = xlsx.write(wb, wopts)

      let FileSaver = require('file-saver')
      let s2ab = function (s) {
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF
        }
        return buf
      }
      // the saveAs call downloads a file on the local machine
      let fileName = header+'.xlsx'
      FileSaver.saveAs(new Blob([s2ab(wbout)], {type:'application/octet-stream'}), fileName)
    },
  }
}
</script>
