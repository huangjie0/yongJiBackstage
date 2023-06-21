import Vue from "vue"
//获取和搜索功能
export function getCertificateInfo(pageNum,pageSize,name){
    return Vue.prototype.$http.get(`/official/qualification/selectAll?pageNum=${pageNum}&pageSize=${pageSize}&name=${name}`)
}
//增加用户列表功能
export function addCertificateInfo(data){
    return Vue.prototype.$http.post('/official/qualification/insert',data)
}
//删除用户功能列表
export function deleteCertificateInfo(id){
    return Vue.prototype.$http.get(`/official/qualification/delete?ids=${id}`)
}
//修改用户功能列表
export function editCertificateInfo(data){
    return Vue.prototype.$http.post('/official/qualification/update',data)
}