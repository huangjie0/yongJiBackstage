import moment from 'moment'
export const time = {
    data() {
        return {
            time: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
    },
    mounted(){
        this.clock = setInterval(()=>{
          this.time = moment().format('YYYY-MM-DD HH:mm:ss')
        },1000)
      },
      beforeDestroy(){
        clearInterval(this.clock)
      },
}