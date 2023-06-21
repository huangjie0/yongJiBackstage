//从本地取激活路径
export function getactivePath(){
    return window.sessionStorage.getItem('activePath') ? window.sessionStorage.getItem('activePath') : ''
}
export function setactivePath(active){
     window.sessionStorage.setItem('activePath',active)
}
export function removeActivePath(){
    window.sessionStorage.removeItem("activePath")
}