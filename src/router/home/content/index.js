export default [{
  path: '/nutrition',
  name: 'nutrition',
  meta: { requireAuth: true },
  component: () => import('@/views/Nutrition.vue'),
  children: [
    {
      path: 'restaurants',
      name: 'restaurants',
      meta: { requireAuth: true },
      component: () => import('@/views/Restaurants.vue'),
    }, {
      path: 'restaurants/dishes',
      name: 'dishes',
      meta: { requireAuth: true },
      component: () => import('@/views/Dishes.vue'),
    }, {
      path: 'restaurants/dishes/editDish',
      name: 'editDish',
      meta: { requireAuth: true },
      component: () => import('@/views/EditDish.vue'),
    }, {
      path: 'recommendSetList',
      name: 'recommendSetList',
      meta: { requireAuth: true },
      component: () => import('@/views/RecommendSetList.vue'),
    }, {
      path: 'recommendSetList/recommendSet',
      name: 'recommendSet',
      meta: { requireAuth: true },
      props: true,
      component: () => import('@/views/RecommendSet.vue'),
    }, {
      path: 'dishSelect',
      name: 'dishSelect',
      meta: { requireAuth: true },
      props: true,
      component: () => import('@/views/DishSelect.vue'),
    }, {
      path: 'files',
      name: 'files',
      meta: { requireAuth: true },
      component: () => import('@/views/Files.vue'),
    }, {
      path: 'test',
      name: 'test',
      meta: { requireAuth: true },
      component: () => import('@/views/test.vue'),
    }],
}];
