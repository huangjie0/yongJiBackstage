//从本地取token值的方法啊
export function getToken(){
    return window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : ''
}
export function setToken(token){
     window.sessionStorage.setItem('token',token)
}
export function removeToken(){
    window.sessionStorage.removeItem('token')
}
export function getUserInfo(){
    return window.sessionStorage.getItem('userInfo') ? window.sessionStorage.getItem('userInfo') : '{}'
}
export function setUserInfo(info){
    window.sessionStorage.setItem('userInfo',info)
}
export function removeUserInfo(){
    window.sessionStorage.removeItem('userInfo')
}