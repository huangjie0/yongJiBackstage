<template>
    <div>
        {{parseFloat(d.num).toFixed(1)}}
    </div>
</template>

<script>
import gsap from 'gsap'
export default {
    name:'CountTo',
    data () {
        return {
            d:{
                num:0
            }      
        }
    },
    props:{
        vaule:{
            type:Number,
            default:0
        }
    },
    watch:{
        vaule(){
            this.AnimateToValue()
        }
    },
    methods:{
        AnimateToValue(){
            gsap.to(this.d,{
                duration:0.5,
                num:this.vaule
            })
        }
    },
    mounted(){
        this.AnimateToValue()
    }
}
</script>

<style>

</style>