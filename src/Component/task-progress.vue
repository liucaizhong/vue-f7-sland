<template lang="html">
<div class="task-progress">
  <div
    class="data-table data-table-init card"
    v-for="type in types"
  >
    <!-- Card header -->
    <div class="card-header">
      <!-- Default table header -->
      <div class="data-table-header">
        <div class="data-table-title">{{ titles[type] }}</div>
      </div>
    </div>
    <div class="card-content">
      <table>
        <thead>
          <tr>
            <th
              class="label-cell"
              v-for="label in forms[type]"
            >{{ label.desc }}</th>
          </tr>
        </thead>
        <tbody v-if="tableData[type].length">
          <tr
            v-for="value in tableData[type]"
          >
            <td
              class="label-cell"
              v-for="name in forms[type]"
            >{{value[name.name]}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="label-cell">待添加</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="data-table card">
    <div class="card-header">
      <div class="data-table-header">
        <div class="data-table-title">完成情况</div>
      </div>
    </div>
    <div class="card-content">
      <div class="chart"></div>
    </div>
  </div>

</div>
</template>

<script>
import { PLANTYPES, PLANTITLES, PLANFORMS } from '../Lib/constant.js'
import axios from 'axios'

export default {
  data () {
    return {
      types: PLANTYPES,
      titles: PLANTITLES,
      forms: PLANFORMS,
    }
  },
  computed: {
    tableData: function () {
      let workplan = {...this.$store.state.workplan}
      return {
        [this.types[0]]: workplan[this.types[0]].curPlan,
        [this.types[1]]: workplan[this.types[1]].curPlan,
        [this.types[2]]: workplan[this.types[2]].curPlan,
      }
    }
  },
  props: {
    'userId': {
      type: String
    },
    'comp': {
      type: String
    }
  },
  mounted () {
    // calc year, quarter and desc
    let curDate = new Date()
    let curYear = curDate.getFullYear()
    let curQuarter = Math.floor(curDate.getMonth()/3)+1
    // declare echarts
    let echarts = require('echarts')
    // get dom element
    let taskHistogram = document.querySelector('.task-progress .chart')
    // calc height;ratio 4:3
    taskHistogram.setAttribute('style', `height:${Math.round(taskHistogram.offsetWidth*3/4)}px;`)
    // declare the histogram instance
    let histogram = echarts.init(taskHistogram)
    // axios get data
    let url = process.env.NODE_ENV === 'production'
                  ? './API/getFinished.php'
                  : 'http://localhost:3000/getfinished'

    axios.get(url,{
      params: {
        comp: this.comp,
        userId: this.userId,
        year: curYear,
        quarter: curQuarter
      }
    })
    .then((response) => {
      let data = response.data
      // draw the histogram
      histogram.setOption({
        color: ['#5584B1'],
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer : {
            type: 'shadow'
          },
          formatter: '{b}<br>{a}: {c}%'
        },
        xAxis: [{
          type: 'category',
          data: this.types.map((type) => {
            return this.titles[type]
          }),
          axisLabel: {
            show: true,
            interval: 0
          }
        }],
        yAxis: [{
          name: '完成比(%)',
          min: 0,
          max: 100,
          type: 'value',
          splitNumber: 5
        }],
        series: [{
            name: '完成比',
            type: 'bar',
            data: this.types.map((type) => {
              return Math.round(+data[type].finish/+data[type].plan*100)
            })
        }]
      })
    })
    .catch((error) => {
      console.log(error)
    })

    // window.onresize = function () {
    //   let el = document.getElementById('task-histogram')
    //   let width = el.offsetWidth
    //   let height = Math.round(width*3/4)
    //   histogram.resize({
    //     width: width+'px',
    //     height: height+'px'
    //   })
    // }

  }
}
</script>
