export default [{
  path: '/',
  component: () => import('@/views/Login.vue'),
  children: [{
    path: '',
    name: 'loginForm',
    props: true,
    component: () => import('@/components/login/page/loginForm.vue'),
  }, {
    path: '/confirmEmail',
    name: 'confirmEmail',
    props: true,
    component: () => import('@/components/login/page/confirmEmail.vue'),
  }, {
    path: '/resetPassword',
    name: 'resetPassword',
    props: true,
    component: () => import('@/components/login/page/resetPassword.vue'),
  }],
}];
