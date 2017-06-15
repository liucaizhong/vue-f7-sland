# Framework7 Vue + Webpack App Template

A full-featured Framework7 + Vue + Webpack setup with hot-reload & css extraction. Based on [Vue Webpack Boilerplate](https://github.com/vuejs-templates/webpack)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Project Structure

* `src/assets` - folder with static assets (images)
* `src/components` - folder with custom `.vue` components
* `src/css` - put custom app CSS styles here. Don't forget to import them in `main.js`
* `src/pages` - app `.vue` pages
* `src/main.js` - main app file where you include/import all required libs and init app
* `src/routes.js` - app routes
* `src/app.vue` - main app structure/component# wx-research-platform-m

# contacts
# json format
{
  'A': {
    'A博时': {
      'A': [
        {
          'id': '0', //系统产生，作唯一标识
          'name': 'Aaron',
          'comp': '博时',
          'indus': '电子',
          'grade': '分析师',
          'phone': '13817134049'
        },
        {
          'id': '1', //系统产生，作唯一标识
          'name': 'Wall',
          'comp': '博时',
          'indus': '电子',
          'grade': '分析师',
          'phone': '13817134049'
        },
        ......
      ],
      'B': [
      ......
      ],
      ......
    },
    'A嘉实': {
      'A': [
        {
          'id': '0', //系统产生，作唯一标识
          'name': 'Aaron',
          'comp': '博时',
          'indus': '电子',
          'grade': '分析师',
          'phone': '13817134049'
        },
        {
          'id': '1', //系统产生，作唯一标识
          'name': 'Wall',
          'comp': '博时',
          'indus': '电子',
          'grade': '分析师',
          'phone': '13817134049'
        },
        ......
      ],
      'B': [
      ......
      ],
      ......
    }
  },
  'B': {
    ......
  }
}
# json api
* Get => Params: comp公司Id或者名称，能作唯一标识的
* Insert => Params: name姓名 + comp公司名称 + indus行业 + grade职称 + phone电话
* Update => Params: id联系人惟一标识 + (name | comp | indus | grade | phone)增量更新其中某几个字段
* Delete => Params: id联系人惟一标识

# workplan
* 通过token的方式传入登录用户的userId
# ajax获取部门及其员工
* params: comp='南土资产', deps=['r']
* 为拓展性考虑，建议将公司Id或者名称也一并传入
* 数组内存放部门名称英文首字母，如r代表研究部，后续可增加其他部门
* results: 返回json对象，例子如下：
* json format:
  {
    '研究部': [{
      userId: '001', //用户唯一标识
      userName: '刘1', //显示姓名
      amount: '1' //当前季度的工作计划数量
    },{
      userId: '002',
      userName: '刘2',
      amount: '2'
    },{
      userId: '003',
      userName: '刘3',
      amount: '3'
    },{
      userId: '004',
      userName: '刘4',
      amount: '4'
    },{
      userId: '005',
      userName: '刘5',
      amount: '5'
    },{
      userId: '006',
      userName: '刘6',
      amount: '6'
    },{
      userId: '007',
      userName: '刘7',
      amount: '7'
    },{
      userId: '008',
      userName: '刘8',
      amount: '8'
    },{
      userId: '009',
      userName: '刘9',
      amount: '9'
    }],
    '投资部': [
    ...
    ],
    ...
  }
# ajax 获取某个用户当前季度的工作计划
* params: comp='南土资产',userId="0001", planType=['r', 's', 'i'], year='2017', quarter= [0,1,2,3]
* 为拓展性考虑，建议将公司Id或者名称也一并传入
* userId: 代表员工Id
* planType:数组内存放工作计划类别英文首字母，如r代表调研计划，s代表个股报告计划，
* 如i代表行业报告计划，后续可增加其他计划类别
* year代表年度，如2017
* quater代表季度，0代表第一季度，以此类推
* results: 返回json对象，例子如下：
* json format:
{
  'r': [{
    id: '001', //记录的唯一标识
    comp: '中航机电',
    date: '2017.12.01',
    event: '期待上涨'
  },{
    id: '002',
    comp: '中航飞机',
    date: '2017.11.01',
    event: '期待上涨'
  },{
    id: '003',
    comp: '中直股份',
    date: '2017.10.01',
    event: '期待上涨'
  }],
  's': [{
    id: '004',
    stock: '中航机电',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  },{
    id: '005',
    stock: '中直股份',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  }],
  'i': [{
    id: '006',
    indus: '军工',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  },{
    id: '007',
    indus: '电子',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  }]
}
# json api for 工作计划
* Insert,Update,Delete => Params: JSON Object  // 可调整
{
  'r': [{
    id: '001', // 更新
    comp: '中航机电',
    date: '2017.12.01',
    event: '期待上涨'
  },{
    id: '001', // 删除
  }，{
    id: '' or undefined, // 新增
    comp: '中航机电',
    date: '2017.12.01',
    event: '期待上涨'
  }],
  's': [{
    id: '004', // 更新
    stock: '中航机电',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  },{
    id: '005', // 删除
  },{
    id: '' or undefined, // 新增
    stock: '中航机电',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  }],
  'i': [{
    id: '006', // 更新
    indus: '军工',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  },{
    id: '007', // 删除
  },{
    id: '' or undefined, // 新增
    indus: '军工',
    finishDate: '2017.12.01',
    reportDate: '2017.12.31'
  }]
}

# ajax 获取某个用户当前季度的工作计划完成情况
* params: comp='南土资产',userId="0001", planType=['r', 's', 'i'], year='2017', quarter= [0,1,2,3]
* 为拓展性考虑，建议将公司Id或者名称也一并传入
* userId: 代表员工Id
* planType:数组内存放工作计划类别英文首字母，如r代表调研计划，s代表个股报告计划，
* 如i代表行业报告计划，后续可增加其他计划类别
* year代表年度，如2017
* quater代表季度，0代表第一季度，以此类推
* results: 返回json对象，例子如下：
* json format: (暂定，可调整)
{
  day="21" // 日期
  month="DEC" // 月份
  time="12:56" // 时间
  title="Item Title" //标题
  subtitle="Item Subtitle" //副标题
  text="Lorem ipsum dol" //正文
}

# 会议列表信息
* params: comp='南土资产', begin='20170606', end='20170707'
# json format
{
  '20170606': [{
    title: '东方环保-格林美荆门基地联合调研',
    time: '10:00',
    place: '荆门市高新技术产业开发区迎春大道',
    guests: '董秘',
    contacts: [{
      person: '卢日鑫',
      phone: '18801969783'
    }, {
      person: '谢超波',
      phone: ''
    }, {
      person: '林清华',
      phone: ''
    }, {
      person: '徐浩涵',
      phone: ''
    }]
  }, {
    title: '东方电子-瑞丰光电联合调研',
    time: '14:30',
    place: '深圳市福田区马哥孛罗好日子酒店 芝加哥厅+迈阿密厅',
    guests: '总裁、副总裁等',
    contacts: [{
      person: '蒯剑',
      phone: '18621367088'
    }, {
      person: '王若擎',
      phone: '18321255549'
    }]
  }],
  '20170607': [{
    title: '东方电子-鼎信通讯联合调研',
    time: '10:00',
    place: '青岛市市南区宁夏路288号6号楼5层',
    guests: '董秘',
    contacts: [{
      person: '马天翼',
      phone: '13524065406'
    }]
  }, {
    title: '东方电子-华灿光电联合调研',
    time: '10:00',
    place: '张家港',
    guests: '总经理、micro-led相关负责人',
    contacts: [{
      person: '王芳',
      phone: '18916064780'
    }]
  }, {
    title: '东方计算机-和创科技联合调研',
    time: '14:40',
    place: '北京市西城区十月大厦8层',
    guests: 'CEO刘学臣、CTO金晨、CFO胡奎、新华都商学院院长何志毅、东方富海合伙人陈利伟、昆仲资本合伙人梁隽樟等',
    contacts: [{
      person: '浦俊懿',
      phone: ''
    }, {
      person: '游涓洋',
      phone: '18910169618'
    }]
  }]
}
