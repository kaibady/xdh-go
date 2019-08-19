import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('./components/layout.vue'),
      children: [
        {
          path: 'go',
          component: () => import('./views/go.vue')
        },
        {
          path: 'tooltip',
          component: () => import('./views/tooltip.vue')
        },
        {
          path: 'circle-menu',
          component: () => import('./views/circle-menu.vue')
        },
        {
          path: 'overview',
          component: () => import('./views/overview.vue')
        },
        {
          path: 'snapshot',
          component: () => import('./views/snapshot.vue')
        },
        {
          path: 'draft',
          component: () => import('./views/draft.vue')
        },
        {
          path: 'tool',
          component: () => import('./views/tool.vue')
        },
        {
          path: 'layout',
          component: () => import('./views/layout.vue')
        },
        {
          path: 'view',
          component: () => import('./views/view.vue')
        },
        {
          path: 'select',
          component: () => import('./views/select.vue')
        },
        {
          path: 'search',
          component: () => import('./views/search.vue')
        },
        {
          path: 'nodes',
          component: () => import('./views/nodes.vue')
        },
        {
          path: 'links',
          component: () => import('./views/links.vue')
        }
      ]
    }
  ]
});

export default router;
