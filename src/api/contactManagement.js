import Vue from "vue"
//获取用户
export function getUserInfo(name,pageNum,pageSize){
    return Vue.prototype.$http.get(`/official/linkman/selectAll?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
//添加用户名
export function addUserInfo(data){
    return Vue.prototype.$http.post('/official/linkman/insert',data)
}
//修改用户名
export function editUserInfo(data){
    return Vue.prototype.$http.post(`/official/linkman/update`,data)
}
//删除用户名
export function deleteUserInfo(id){
    return Vue.prototype.$http.get(`/official/linkman/delete?ids=${id}`)
}