import Vue from "vue"
export function init(){
    return Vue.prototype.$http.get('/official/index/getIndex?year=2023')
}