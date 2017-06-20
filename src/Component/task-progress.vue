<template lang="html">
<div class="task-progress">
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    // declare echarts
    let echarts = require('echarts')
    // get dom element
    let taskHistogram = document.querySelector('.task-progress')
    // calc height;ratio 4:3
    taskHistogram.setAttribute('style', `height:${Math.round(taskHistogram.offsetWidth*3/4)}px;`)
    // declare the histogram instance
    let histogram = echarts.init(taskHistogram)
    // axios get data
    let chartData = [5, 20, 85]
    // draw the histogram
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
          data: chartData
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
