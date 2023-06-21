import Vue from "vue"
// //获取和搜索功能
export function getNewsInformationInfo(data){
    return Vue.prototype.$http.post(`/official/newsInfo/selectList`,data)
}
//获取单个新闻数据
export function getOneNewsInformationInfo(id){
    return Vue.prototype.$http.post(`/official/newsInfo/selectOne?id=${id}`)
}
//增加用户列表功能
export function addNewsInformationInfo(data){
    return Vue.prototype.$http.post('/official/newsInfo/insert',data)
}
//删除用户功能列表
export function deleteNewsInformationInfo(id){
    return Vue.prototype.$http.get(`/official/newsInfo/delete?id=${id}`)
}
//修改用户功能列表
export function editNewsInformationInfo(data){
    return Vue.prototype.$http.post('/official/newsInfo/edit',data)
}
//上传图片
export function uploadPicturesInfo(data){
    return Vue.prototype.$http.post('/official/newsInfo/insertPicture',data)
}
//删除单个图片
export function deleteOnePicture(id){
    return Vue.prototype.$http.post(`/official/newsInfo/deletePicture?id=${id}`)
}
//重命名图片
export function reNamePicture(id,name){
    return Vue.prototype.$http.post(`/official/newsInfo/editPictureName?id=${id}&name=${name} `)
}