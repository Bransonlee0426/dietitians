export default [{
  path: '*',
  component: () => import('@/views/404.vue'),
}, {
  path: '/verifyExpired',
  name: 'verifyExpired',
  component: () => import('@/views/VerifyExpired.vue'),
}, {
  path: '/passPage',
  name: 'passPage',
  component: () => import('@/views/PassPage.vue'),
}];
