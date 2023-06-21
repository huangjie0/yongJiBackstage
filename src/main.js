import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'
import 'viewerjs/dist/viewer.css'
import Viewer  from 'v-viewer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
import {getToken} from '@/until/useToken'
nprogress.configure({
  showSpinner:false
})
axios.defaults.baseURL = 'http://47.122.20.110'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const token = getToken()
  if(token){
    config.headers['token'] = token
  }
  nprogress.start()
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  nprogress.done()
  return response;
}, function (error) {
  return Promise.reject(error);
});
Vue.prototype.$http = axios
Vue.use(Viewer)
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
