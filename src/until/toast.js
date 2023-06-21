import { Message } from 'element-ui';
export function toast(message,type='success',dangerouslyUseHTMLString=true){
    Message({
        message,
        type,
        duration:1000,
        dangerouslyUseHTMLString,
        customClass: 'messageIndex'
    })
}