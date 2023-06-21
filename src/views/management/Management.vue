<template>
  <div>
    <el-container class="home_container">
      <el-header>
        <div>
          <img src="@/assets/img/header/logo.png" class="img" />
          <span>数据管理系统</span>
          <div class="refresh" @click="refresh()">
            <i class="el-icon-refresh"></i>
          </div>
        </div>
        <div>
          <div>
            <i class="el-icon-user"></i>
            <span style="font-size: 15px;">{{ userName }}</span>
          </div>
          <el-button type="info" @click="logout()" style="margin-left: 20px;">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? 64+'px' : 200+'px'">
          <div class="toggle-button" @click="changeCollapse()">
            <i class="el-icon-s-fold" v-if="!isCollapse"></i>
            <i class="el-icon-s-unfold" v-else></i>
          </div>
          <el-menu
            background-color="#373d41"
            text-color="#fff"
            :default-active="activePath"
            :unique-opened="true"
            :collapse-transition="false"
            :router="true"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
          > 
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span style="color: white;">{{item.authName}}</span>
              </template>
              <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id" @click="changeChildrenPath(item2.path)">
                <template>
                  <i :class="item2.icon"></i>
                  <span>{{item2.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getactivePath,setactivePath,removeActivePath} from "@/until/activepath.js"
import {removeToken,removeUserInfo} from "@/until/useToken"
import {getUserInfo} from '@/until/useToken'
import { toast } from '@/until/toast'
export default {
  name: "Management",
  data() {
    return {
      // 默认按钮激活的路径
      activePath:"",
      isCollapse:false,
      userName:'',
      menuList:[
        {
          authName:"后台面板",
          id:0,
          icon:"el-icon-star-on",
          path:"backgroundPanel",
          children:[
            {
              authName:"后台首页",
              id:0,
              icon:"el-icon-s-platform",
              path:"backgroundHomePage"
            }
          ]
        },
        {
          authName:'人才招聘管理',
          id:1,
          icon:'el-icon-s-custom',
          path:'talentRecruitment',
          children:[
            {
              authName:"人才招聘列表",
              id:0,
              path:'recruitmentTalents',
              icon:"el-icon-s-custom"
            }
          ]
        },
        {
          authName:'综合管理',
          id:2,
          icon:'el-icon-s-grid',
          path:'comprehensiveManagement',
          children:[
            {
              authName:'新闻资讯',
              id:0,
              path:'newsInformation',
              icon:'el-icon-mobile'
            },
            {
              authName:'资质认证',
              id:1,
              path:'qualificationCertification',
              icon:'el-icon-pie-chart'
            },
            {
              authName:'产品介绍',
              id:2,
              path:'productIntroduction',
              icon:'el-icon-orange'
            },
            {
              authName:'工程介绍',
              id:3,
              path:'projectIntroduction',
              icon:'el-icon-money'
            },
          ]
        },
        {
          authName:'热点新闻管理',
          id:3,
          icon:'el-icon-s-order',
          path:"hotNews",
          children:[
            {
              authName:'热点新闻列表',
              id:0,
              path:"hotNewsManagement",
              icon:"el-icon-s-order"
            }
          ]
        },
        {
          authName:'分公司介绍管理',
          id:4,
          icon:'el-icon-office-building',
          path:"introductionOfBranchCompany",
          children:[
            {
              authName:'分公司介绍列表',
              id:0,
              path:"branchIntroductionManagement",
              icon:'el-icon-office-building'
            }
          ]
        },
        {
          authName:'联系人管理',
          id:5,
          icon:'el-icon-user-solid',
          path:"contactManagement",
          children:[
            {
              authName:'联系人列表',
              id:0,
              path:'contactManagement',
              icon:"el-icon-user-solid"
            }
          ]
        }
      ]
    }
  },
  methods: {
    //刷新页面
    refresh(){
      location.reload()
    },
    changeChildrenPath(path){
      // 本地存储激活路径
      setactivePath(path)
    },
    logout() {
      this.$http.get('/official/user/logOut').then((res)=>{
        if(res.status==200){
          toast('退出成功','success')
          removeUserInfo()
        }
      })
      removeToken()
      removeActivePath()
      //用户点击退出按钮退出登录并清除token值
      // this.$router.push("/login");
      this.$router.push({
        name:'login'
      })
    },
    changeCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },
  created(){
    this.activePath = getactivePath()
    this.userName = JSON.parse(getUserInfo()).userName
  }
};
</script>

<style scoped lang="less">
.refresh,.fullScreen:hover{
  cursor: pointer;
}
.refresh{
  width: 30px;
  height: 100%;
  margin-left: 10px;
  text-align: center;
  margin-right: 10px;
}
/deep/ .el-icon-arrow-down {
  display: none;
}

.el-aside {
  background-color: #373d41;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 20px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.home_container {
  height: 100vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}
.el-menu{
    border-right:none;
}
</style>