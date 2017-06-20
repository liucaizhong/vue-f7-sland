<template lang="html">
<div id="task-histogram" class="task-progress">
</div>
</template>

<script>
export default {
  data () {
    return {
      chartData: [5, 20, 85]
    }
  },
  created () {
    // axios get data
  },
  mounted () {
    // calc height;ratio 4:3
    let taskHistogram = document.getElementById('task-histogram')
    taskHistogram.setAttribute('style', `height:${Math.round(taskHistogram.offsetWidth*3/4)}px;`)
    console.dir(taskHistogram)
    // declare echarts and draw the histogram
    let echarts = require('echarts')
    let histogram = echarts.init(taskHistogram)

    histogram.setOption({
      color: ['#5584B1'],
      title: {
        show: false
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
        data: ['调研', '个股深度', '行业深度']
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
          data: this.chartData
      }]
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
