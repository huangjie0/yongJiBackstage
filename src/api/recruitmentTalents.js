import Vue from "vue"
//获取和搜索功能
export function getUserInfo(pageNum,jobName){
    return Vue.prototype.$http.post(`/official/recruit/selectAllRecruit?jobName=${jobName}&pageNum=${pageNum}&pageSize=10`)
}
//增加用户列表功能
export function addUserInfo(data){
    return Vue.prototype.$http.post('/official/recruit/insertRecruit',data)
}
//删除用户功能列表
export function deleteUserInfo(id){
    return Vue.prototype.$http.post(`/official/recruit/deleteRecruit?recruitId=${id}`)
}
//修改用户功能列表
export function editUserInfo(data){
    return Vue.prototype.$http.post('/official/recruit/updateRecruit',data)
}