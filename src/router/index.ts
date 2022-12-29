import { createRouter, createWebHistory } from 'vue-router';
import Recipe from 'src/features/Recipe/Recipe.vue';

const routes = [
  {
    path: '/recipe/:recipe_id',
    name: 'recipe',
    component: Recipe,
    props: true,
  },
  {
    path: '/',
    name: 'home',
    component: Recipe,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
