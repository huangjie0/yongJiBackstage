import Vue from "vue"
//获取用户
export function getBranchIntroductionInfo(name='',pageNum,pageSize){
    return Vue.prototype.$http.get(`/official/sonCompany/selectAll?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
//添加用户名
export function addBranchIntroductionInfo(data){
    return Vue.prototype.$http.post('/official/sonCompany/insert',data)
}
//修改用户名
export function editBranchIntroductionInfo(data){
    return Vue.prototype.$http.post(`/official/sonCompany/update`,data)
}
//删除用户名
export function deleteBranchIntroductionInfo(id){
    return Vue.prototype.$http.get(`/official/sonCompany/delete?ids=${id}`)
}