import Vue from "vue"
// //获取和搜索功能
export function getProductIntroductionInfo(pageNum,pageSize,name){
    return Vue.prototype.$http.get(`/official/products/selectAll?pageNum=${pageNum}&pageSize=${pageSize}&name=${name}`)
}
//增加用户列表功能
export function addProductIntroductionInfo(data){
    return Vue.prototype.$http.post('/official/products/insert',data)
}
//删除用户功能列表
export function deleteProductIntroductionInfo(id){
    return Vue.prototype.$http.get(`/official/products/delete?ids=${id}`)
}
//修改用户功能列表
export function editProductIntroductionInfo(data){
    return Vue.prototype.$http.post('/official/products/update',data)
}