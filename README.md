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
# json format
