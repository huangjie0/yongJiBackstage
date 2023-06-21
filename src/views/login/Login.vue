<template>
  <div class="loginBackground">
    <div class="loginBackgroundContent">
      <div class="loginLogo">
        <img src="@/assets/img/header/logo.png" alt="">
      </div>
      <div class="loginBackgroundContentItem">
        <el-form
          ref="loginFormRef"
          :rules="rules"
          :model="loginform"
          label-width="0"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginform.username"
              clearable
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-setting"
              v-model="loginform.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input
              prefix-icon="el-icon-view"
              v-model="loginform.verifyCode"
              clearable
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
          <div class="verificationCode">
            <div class="verificationCodeImg">
              <img :src="pUrl" alt="图片加载失败...">
            </div>
          </div>
          <el-form-item class="btns">
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button type="info"  @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {setToken,getUserInfo,setUserInfo} from "@/until/useToken"
import { toast } from '@/until/toast'
import { login} from '@/api/login'
import {basicURL } from '@/api/basicUrl'
export default {
  name: "login",
  data() {
    return {
      isReload:true,
      isShow:true,
      pUrl:'',
      loginform: {
        username: "",
        password: "",
        verifyCode:""
      },
      rules: {
          username: [
            { required: true, message: "请输入登录名称", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入登录密码", trigger: "blur" },
          ],
          verifyCode:[
            {
              required:true,message:"请输入验证码",trigger:"blur"
            }
          ]
        },
    };
  },
  created(){
    this.getImgUrl()
    this.loginform.username = JSON.parse(getUserInfo('userInfo')).userName
    this.loginform.password = JSON.parse(getUserInfo('userInfo')).password
  },
  beforeDestroy(){
    this.$router.go(0)
  },
  methods: {
    getImgUrl(){
      this.pUrl = basicURL() + '/official/verifyCode/verifyCode'
    },
    //表单重置功能
    resetForm(){
        this.loginform.username = ''
        this.loginform.password = ''
        this.$refs.loginFormRef.resetFields();
    },
    //表单登录
    submitForm(){
      this.$refs.loginFormRef.validate((valid)=>{
        let userInfo = {
          userName:this.loginform.username,
          password:this.loginform.password
        }
        setUserInfo(JSON.stringify(userInfo))
        if(valid){
          login(this.loginform).then(res=>{
            if(res.data.msg=="请求成功"){
              toast('登录成功','success')
              setToken(res.data.result.token)
              this.$router.push('/backgroundHomePage')
            }
            if(res.data.msg=='验证码错误'){
              toast('验证码错误','error')
              setTimeout(()=>{
                this.$router.go(0)
              },500)
            }
            if(res.data.msg == '密码错误'){
              toast('密码错误','error')
              setTimeout(()=>{
                this.$router.go(0)
              },500)
            }
            if(res.data.msg!=='请求成功' && res.data.msg!=='验证码错误'){
              toast(res.data.msg,'error')
            }
        }).catch(()=>{
          toast("请求失败",'error')
        })
        }
      })
    }
  },
};
</script>
<style scoped lang="less">
.verificationCode{
  width: 100%;
  height: 30px;
  display: flex;
  .verificationCodeButton:hover{
    color:#77c1f2 !important;
    cursor: pointer;
  }
  .verificationCodeImg{
    width: 20%;
    height: 30px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
/deep/ .el-form {
  width: 80%;
}
.loginBackground {
  height: 100%;
  background: linear-gradient(to top, #386584, #276b6a);
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBackgroundContent {
    width: 600px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    position: relative;
    .loginLogo{
      width: 150px;
      height: 150px;
      background-color: white;
      position:absolute;
      border-radius: 50%;
      top: -120px;
      left: 230px;
      box-shadow: 0 0 10px #ddd;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .loginBackgroundContentItem {
      width: 70%;
      height: 80%;
      background-color: rgba(255, 255, 255, 0.5);
      margin-top: 50px;
      margin-left: 100px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>