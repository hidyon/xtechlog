import Vue from 'vue'
import VueRouter from 'vue-router'
import homeComponent from './components/home.vue'
import articleComponent from './components/article.vue'
import postNewArticleComponent from './components/postNewArticle.vue'
import editArticleComponent from './components/editArticle.vue'

Vue.use(VueRouter)

const routes = [
  { path : '/', name: 'home', component: homeComponent },
  { path : '/articles/:id', name:'viewArticle',  component: articleComponent, props: true },
  { path : '/articles/', name:'postNewArticle',  component: postNewArticleComponent  },
  { path : '/articles/:id/edit', name:'editArticle',  component: editArticleComponent, props: true  },
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


