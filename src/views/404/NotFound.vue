<template>
  <div>
    <el-empty description="404,您访问的页面不存在！">
        <el-button type="primary" @click="returnHome">返回首页</el-button>
        <el-button type="primary" @click="returnPreviousPage">返回上一页</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
    name:"NotFound",
    methods:{
        returnHome(){
            this.$router.push('/home')
        },
        returnPreviousPage(){
            this.$router.back()
        }
    }
}
</script>

<style>
</style>