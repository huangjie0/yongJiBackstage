import Vue from "vue"
export function login(data){
    return Vue.prototype.$http.post('/official/user/login',data)
}