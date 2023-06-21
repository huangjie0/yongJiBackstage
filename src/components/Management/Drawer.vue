<template>
  <div>
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :wrapperClosable="false"
      size="50%"
      :before-close="handleClose"
    >
      <span>
        <slot></slot>
      </span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  props:{
    title:{
        type:String,
        default:"新增"
    }
  },
  data() {
    return {
      drawer: false,
    };
  },
  watch:{
    drawer(newVal){
      if(!newVal){
          this.$emit('drawerval',newVal)
      }
    }
  },
  methods: {
    handleClose() {
      this.drawer = false;
    }
  },
};
</script>

<style lang="less" scoped>
</style>