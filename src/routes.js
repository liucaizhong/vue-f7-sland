export default [
  {
    path: '/contacts',
    component: require('./pages/comp-list.vue')
  },
  {
    path: '/contacts/:g_comp/:comp',
    component: require('./pages/user-list.vue'),
  },
  {
    path: '/contacts/:g_comp/:comp/:g_user/:id',
    component: require('./pages/contact-detail.vue')
  },
  {
    path: '/workplan',
  },
]
