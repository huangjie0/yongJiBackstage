import Vue from "vue"
// //获取和搜索功能
export function getEngineeringInfo(pageNum,pageSize,name){
    return Vue.prototype.$http.get(`/official/projects/selectAll?pageNum=${pageNum}&pageSize=${pageSize}&name=${name}`)
}
//增加用户列表功能
export function addEngineeringInfo(data){
    return Vue.prototype.$http.post('/official/projects/insert',data)
}
//删除用户功能列表
export function deleteEngineeringInfo(id){
    return Vue.prototype.$http.get(`/official/projects/delete?ids=${id}`)
}
//修改用户功能列表
export function editEngineeringInfo(data){
    return Vue.prototype.$http.post('/official/projects/update',data)
}