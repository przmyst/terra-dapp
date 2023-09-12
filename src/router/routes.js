const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {path: '/instantiate', component: () => import('pages/Instantiate.vue')},
      {path: '/execute', component: () => import('pages/Execute.vue')},
      {path: '/query', component: () => import('pages/Query.vue')}
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
