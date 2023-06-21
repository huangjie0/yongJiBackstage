import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getToken
} from '@/until/useToken'
import { toast} from '@/until/toast'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  // 使用路由模式完成页面跳转
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    meta: {
      title: '永基登录页',
      requiresAuth:false
    },
    name: 'login',
    component: resolve => (require(["@/views/login/Login.vue"], resolve))
  },
  {
    path: '/management',
    name: 'management',
    component: resolve => (require(["@/views/management/Management.vue"], resolve)),
    redirect: '/backgroundHomePage',
    children: [
      {
        path:"/backgroundHomePage",
        component: resolve => (require(["@/views/management/backgroundHomePage/BackgroundHomePage.vue"], resolve)),
        meta:{
          title:'后台首页',
          requiresAuth:true
        }
      },
      {
        path: '/recruitmentTalents',
        meta: {
          title: '人才招聘管理',
          requiresAuth:true
        },
        name: 'RecruitmentTalents',
        component: resolve => (require(["@/views/management/recruitmentTalents/RecruitmentTalents.vue"], resolve))
      },
      {
        path:"/comprehensiveManagement",
        redirect:"/newsInformation"
      },
      {
        path: '/hotNewsManagement',
        meta: {
          title: "热点新闻管理",
          requiresAuth:true
        },
        name: "HotNewsManagement",
        component: resolve => (require(["@/views/management/hotNewsManagement/HotNewsManagement.vue"], resolve))
      },
      {
        path: '/branchIntroductionManagement',
        meta: {
          title: "分公司介绍管理",
          requiresAuth:true
        },
        name: "branchIntroductionManagement",
        component: resolve => (require(["@/views/management/branchIntroductionManagement/BranchIntroductionManagement.vue"], resolve))
      },
      {
        path: '/contactManagement',
        meta: {
          title: "联系人管理",
          requiresAuth:true
        },
        name: "ContactManagement",
        component: resolve => (require(["@/views/management/contactManagement/ContactManagement.vue"], resolve))
      },
      {
        path: '/newsInformation',
        meta: {
          title: "新闻资讯",
          requiresAuth:true
        },
        name: 'NewsInformation',
        component: resolve => (require(["@/views/management/integratedManagement/NewsInformation.vue"], resolve))
      },
      {
        path: '/qualificationCertification',
        meta: {
          title: "资质认证",
          requiresAuth:true
        },
        name: 'QualificationCertification',
        component: resolve => (require(["@/views/management/integratedManagement/QualificationCertification.vue"], resolve))
      },
      {
        path: '/productIntroduction',
        meta: {
          title: "产品介绍",
          requiresAuth:true
        },
        name: 'ProductIntroduction',
        component: resolve => (require(["@/views/management/integratedManagement/ProductIntroduction.vue"], resolve))
      },
      {
        path: '/projectIntroduction',
        meta: {
          title: "工程介绍",
          requiresAuth:true
        },
        name: 'ProjectIntroduction',
        component: resolve => (require(["@/views/management/integratedManagement/ProjectIntroduction.vue"], resolve))
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component:  resolve => (require(["@/views/404/NotFound.vue"], resolve))
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
//全局路由守卫，判定用户是否登录
router.beforeEach((to, from, next) => {
  let token = getToken()
  //防止重复登录
  if(token !== '' && to.path == '/login'){
    toast('请勿重复登录','error')
    return next({
        path:from.path ? from.path : '/backgroundHomePage'
    })
  }
  if(to.meta.requiresAuth){
    if(token){
      next()
    }else{
      next({
        path:'/login'
      })
    }
  }
  next()
  //设置页面标题
  let title = to.meta.title ? to.meta.title : ""
  document.title = title
})
export default router
