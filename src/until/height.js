export const height = {
    data() {
        return {
            h:""
        }
    },
    created() {
        const windowHeight = window.innerHeight || document.body.clientHeight
        this.h = windowHeight - 60 - 12 - 60;
    },
}