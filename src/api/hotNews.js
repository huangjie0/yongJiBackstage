import Vue from "vue"
// //获取和搜索功能
export function getNewsInfo(pageNum,pageSize,name){
    return Vue.prototype.$http.get(`/official/news/selectAll?pageNum=${pageNum}&pageSize=${pageSize}&name=${name}`)
}
//增加用户列表功能
export function addNewInfo(data){
    return Vue.prototype.$http.post('/official/news/insert',data)
}
//删除用户功能列表
export function deleteNewInfo(id){
    return Vue.prototype.$http.get(`/official/news/delete?ids=${id}`)
}
//修改用户功能列表
export function editNewInfo(data){
    return Vue.prototype.$http.post('/official/news/update',data)
}