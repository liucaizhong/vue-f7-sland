export const PLANTYPES = ['r', 's', 'i']
export const DEPARTMENTS = ['r']
export const DEPARTMENTSDESC = {
  'r': '研究部'
}
export const PLANTITLES = {
  'r': '调研',
  's': '个股深度报告',
  'i': '行业深度报告',
}
export const PLANFORMS = {
  'r': [{
    name: 'comp',
    desc: '公司名称'
  },{
    name: 'date',
    desc: '预计调研日期'
  },{
    name: 'event',
    desc: '预期看点'
  }],
  's': [{
    name: 'stock',
    desc: '个股名称'
  },{
    name: 'finishDate',
    desc: '预计完成日期'
  },{
    name: 'reportDate',
    desc: '预计汇报日期'
  }],
  'i': [{
    name: 'indus',
    desc: '行业主题'
  },{
    name: 'finishDate',
    desc: '预计完成日期'
  },{
    name: 'reportDate',
    desc: '预计汇报日期'
  }]
}
