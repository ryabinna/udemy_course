import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register';
import GlobalFeed from '@/views/GlobalFeed';
import YourFeed from '@/views/YourFeed';
import TagFeed from '@/views/TagFeed';
import Login from '@/views/Login';
import Article from '@/views/Article';
import CreateArticle from '@/views/CreateArticle';
import EditArticle from '@/views/EditArticle';
import Settings from '@/views/Settings';
import UserProfile from '@/views/UserProfile';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticle
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
