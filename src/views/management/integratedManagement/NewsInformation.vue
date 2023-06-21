<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>综合管理</el-breadcrumb-item>
      <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container :style="{ height: h + 'px' }">
      <!-- 头部区域 -->
      <el-header class="containerButton">
        <el-button type="primary" @click="addNews()">新增</el-button>
        <el-button type="warning" @click="uploadPictures()">上传图片</el-button>
        <el-input v-model="queryParams.title" placeholder="请输入新闻标题" clearable @clear="clearInfo"></el-input>
        <el-button type="info" icon="el-icon-search" @click="searchInfo"></el-button>
        <el-button type="success" @click="reset">重置</el-button>
      </el-header>
      <el-container>
        <el-aside width="300px" class="aside" v-loading="loading">
          <div class="top">
            <div class="newList" @click="changeActive(item)" v-for="(item, index) in newList" :key="item.id">
              <div class="newListLeft" :class="{ active: active == item.id }">
                {{ item.title }}
              </div>
              <div class="newListContainer" :class="{ active: active == item.id }">
                {{ item.createTime }}
              </div>
              <div class="newListRight">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="editNews(item)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteInfo"></el-button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <el-pagination background layout="total,prev, pager, next" :total="total" @current-change="currentPage"
              :current-page="pageNum">
            </el-pagination>
          </div>
        </el-aside>
        <el-main>
          <el-row :gutter="12" v-loading="loading_1">
            <div v-if="pictureList.length !== 0">
              <el-col :span="4" v-for="(item, index) in pictureList" :key="index">
                <el-card>
                  <div style="height:180px">
                    <el-image style="height:100px;display:flex;justify-content: center;align-items: center;"
                      :src="item.url"></el-image>
                    <div style="display:flex;  justify-content: center;align-items: center;">
                      <el-button type="text" @click="rePictureName(item.pictureName, item.id)">重命名</el-button>
                      <el-button type="text" @click="deletePicture(item.id)">删除</el-button>
                    </div>
                    <div class="rename">
                      {{ item.pictureName }}
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div v-else>
              <el-col :span="4" v-for="(item, index) in 6" :key="index">
                <el-card>
                  <div style="height:180px">
                    <el-empty description="请添加照片" :image-size="100"></el-empty>
                  </div>
                </el-card>
              </el-col>
            </div>
          </el-row>
          <el-row :gutter="12" style="margin-top: 20px;">
            <el-col :span="16">
              <el-card style="height: 330px;overflow: auto;">
                <span>数据统计</span>
                <el-divider></el-divider>
                <TechnologyServiceBar :total="total" :newList="newList" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card style="height: 330px; overflow-y: auto;">
                <span>最新动态</span>
                <el-divider></el-divider>
                <el-timeline>
                  <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                    :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <!-- 抽屉模块 -->
    <Drawer ref="drawerRef" title="新增" @drawerval="drawerval">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="新闻标题" prop="title">
          <el-input type="text" v-model="ruleForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker v-model="ruleForm.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"
            clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <div class="lookText">
            <el-input type="textarea" v-model="ruleForm.content" clearable minlength="940" maxlength="960" show-word-limit></el-input>
          </div>
        </el-form-item>
        <el-form-item label="排序" prop="orderId">
          <el-input v-model="ruleForm.orderId" clearable type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </Drawer>
    <!-- 上传图片组件 -->
    <Drawer ref="uploadPicturesRef" title="上传图片">
      <div class="upload-demo">
        <el-upload drag :action="upurl" :limit="1" :headers="headers" accept=".jpg, .png, .tif, .pdf, .jpeg"
          ref="uploadClear" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-remove="beforeRemove"
          :before-upload="beforeUpload" :multiple="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">请上传.jpg, .png, .tif, .pdf, .jpeg格式的图片</div>
        </el-upload>
      </div>
      <div style="display: flex;justify-content: center;align-items: center;margin-top: 2%;">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancelPicture">取消</el-button>
      </div>
    </Drawer>
    <!-- 修改图片组件 -->
    <Drawer ref="editNewsRef" title="修改新闻" @drawerval="drawerval_1">
      <el-form :model="newsInformation" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="新闻标题" prop="title">
          <el-input type="text" v-model="newsInformation.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker v-model="newsInformation.createTime" type="date" placeholder="选择日期" clearable
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <div class="lookText">
            <el-input type="textarea" v-model="newsInformation.content" clearable minlength="940" maxlength="960"
              show-word-limit></el-input>
          </div>
        </el-form-item>
        <el-form-item label="排序" prop="orderId">
          <el-input v-model="newsInformation.orderId" clearable type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm_1('ruleForm')">修改</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </Drawer>
    <!-- 图片重命名组件-->
    <Drawer title="图片重命名" ref="imageRenamingRef" @drawerval="drawerval_2">
      <div>
        <el-form :model="imgRename" :rules="imgRenameRules" label-width="100px" ref="imgRenameRef">
          <el-form-item label="图片名称" prop="name">
            <el-input v-model="imgRename.name" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitImgRename('imgRenameRef')">确定</el-button>
            <el-button @click="cancelForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { getNewsInformationInfo, addNewsInformationInfo, deleteNewsInformationInfo, editNewsInformationInfo, uploadPicturesInfo, getOneNewsInformationInfo, deleteOnePicture, reNamePicture } from '@/api/newsInformation.js'
import Drawer from "@/components/Management/Drawer.vue";
import { toast } from '@/until/toast'
import { height } from "@/until/height";
import TechnologyServiceBar from "@/components/Management/TechnologyServiceBar.vue";
import { basicURL } from '@/api/basicUrl'
import { getToken } from '@/until/useToken'
import { compressionImage } from '@/until/documentProcessing'
export default {
  name: "NewsInformation",
  components: {
    Drawer,
    TechnologyServiceBar
  },
  mixins: [height],
  data() {
    var validate = (rule, value, callback) => {
      if (value.length < 940) {
        return callback(new Error('字数不能少于940'))
      } else {
        callback()
      }
    };
    return {
      pageNum: 1,
      flag: false,
      pageSize: 10,
      total: 0,
      loading: false,
      loading_1: false,
      //图片上传地址
      upurl: basicURL() + '/official/file/uploadFile',
      pictureName: '',
      pictureUrl: '',
      pictureList: [],
      count: 0,
      headers: {
        token: getToken()
      },
      fileAddr: "",
      activities: [],
      h: "",
      active: null,
      // 图片重命名查询数据
      imgRename: {
        name: '',
        id: ''
      },
      imgRenameRules: {
        name: [
          {
            required: true,
            message: "请输入图片重命名的标题",
            trigger: "blur",
          },
        ],
      },
      //点击编辑展示默认的新闻内容
      newsInformation: {
        title: "",
        createTime: "",
        content: "",
        id: '',
        orderId: 0
      },
      ruleForm: {
        //新闻标题
        title: "",
        createTime: "",
        content: "",
        orderId: 0
      },
      queryParams: {
        title: ''
      },
      rules: {
        title: [
          { required: true, message: "请输入新闻标题", trigger: "blur" },
        ],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" },
        ],
        content: [
          { validator: validate, trigger: 'blur' },
          { required: true, message: "请输入新闻内容", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "请输入排序", trigger: "blur" },
        ]
      },
      // 新闻小列表
      newList: [],
    };
  },
  created() {
    this.getList()
    setTimeout(() => {
      if (this.active !== null) {
        this.getOneNewInfo(this.active)
      }
    }, 500)
    this.ruleForm.createTime = this.getNewTime()
  },
  methods: {
    getNewTime() {
      let time = new Date()
      var Y = time.getFullYear();
      var M = time.getMonth() + 1
      var D = time.getDate()
      var h = time.getHours()
      var m = time.getMinutes()
      var s = time.getSeconds()
      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (M < 10) {
        M = '0' + M
      }
      if (D < 10) {
        D = '0' + D
      }
      if (s < 10) {
        s = '0' + s
      }
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
    drawerval_2(val) {
      if (!val) {
        this.$refs.imgRenameRef.clearValidate()
      }
    },
    rePictureName(val, id) {
      this.imgRename.name = val
      this.imgRename.id = id
      this.$refs.imageRenamingRef.drawer = true
    },
    deletePicture(id) {
      deleteOnePicture(id).then((res) => {
        if (res.data.code == '200') {
          toast('删除图片成功！')
          this.getOneNewInfo(this.active)
        } else {
          toast('删除图片失败!', 'error')
        }
      })
    },
    //查询单个新闻数据
    getOneNewInfo(id) {
      this.loading_1 = true
      getOneNewsInformationInfo(id).then((res) => {
        if (res.data.code == '200') {
          this.pictureList = res.data.result.newsInfoPictureList
        }
      }).finally(() => {
        this.loading_1 = false
      })
    },
    confirm() {
      if (this.pictureList.length > 5) {
        toast('添加图片最多6张！', 'warning')
      } else {
        if (this.pictureUrl !== '') {
          this.savePictures()
        }
      }
    },
    cancelPicture() {
      this.$refs.uploadPicturesRef.drawer = false
    },
    //保存图片
    savePictures() {
      let params = {
        newsId: this.active,
        url: this.pictureUrl,
        pictureName: this.pictureName
      }
      uploadPicturesInfo(params).then((res) => {
        if (res.data.code == '200') {
          this.$refs.uploadPicturesRef.drawer = false
          toast('图片保存成功！')
          //刷新页面
          this.getOneNewInfo(this.active)
        }
      })
    },
    //上传成功回调函数
    handleAvatarSuccess(res) {
      if (res.code !== 200) return
      if (res.code == '200') {
        toast('图片已上传！')
        this.pictureUrl = basicURL() + res.result.fileAddr
      }
    },
    //图片上传失败的函数
    handleAvatarError() {
      toast('图片上传失败！', 'error')
    },
    beforeRemove() {
      toast('取消上传!', 'warning')
      this.pictureUrl = ''
      this.pictureName = ''
    },
    //图片上传之前压缩图片处理
    beforeUpload(file) {
      this.pictureName = file.name
      compressionImage(file, 0.8, 1500, 1500)
    },
    clearInfo() {
      this.reset()
    },
    reset() {
      for (const key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
      this.queryParams.title = ''
      this.pageNum = 1
      this.pageSize = 10
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.queryParams.title,
      }
      getNewsInformationInfo(params).then((res) => {
        if (res.data.code == '200') {
          if (res.data.result.list.length !== 0) {
            this.active = res.data.result.list[0].id
            this.getOneNewInfo(this.active)
          }
        }
      }).finally(() => {
        this.loading = false
      })
      this.getList()
    },
    searchInfo() {
      this.pageNum = 1
      this.getList()
      this.getOneNewInfo(this.active)
    },
    currentPage(val) {
      this.pageNum = val
      this.getList()
      setTimeout(() => {
        this.getOneNewInfo(this.active)
      }, 50)
    },
    drawerval(val) {
      if (!val) {
        for (const key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
        this.$refs.ruleForm.clearValidate()
      }
    },
    drawerval_1(val) {
      if (!val) {
        this.$refs.ruleForm.clearValidate()
      }
    },
    //删除
    deleteInfo() {
      deleteNewsInformationInfo(this.active).then((res) => {
        if (res.data.code == '200') {
          toast('删除本条新闻数据成功！')
          this.getList()
          setTimeout(() => {
            this.getOneNewInfo(this.active)
          }, 50)
        } else {
          toast('删除新闻数据失败', 'error')
        }
      })
    },
    //获取数据
    getList() {
      this.loading = true
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.queryParams.title,
      }
      getNewsInformationInfo(params).then((res) => {
        if (res.data.code == '200') {
          this.total = res.data.result.total
          this.newList = res.data.result.list
          if (res.data.result.list.length == 0 && res.data.result.total !== 0) {
            this.pageNum = this.pageNum - 1
            this.getList()
          }
          let activitiesList = []
          this.newList.map((item) => {
            let activitiesObj = {}
            activitiesObj.content = item.title
            activitiesObj.timestamp = item.createTime
            activitiesObj.color = '#0bbd87'
            activitiesList.push(activitiesObj)
          })
          this.activities = activitiesList
          if (res.data.result.list.length !== 0) {
            console.log(res.data.result.list[0].id);
            this.active = res.data.result.list[0].id
          }
        }
      }).finally(() => {
        this.loading = false
      })
    },
    submitImgRename(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (valid) {
            reNamePicture(this.imgRename.id, this.imgRename.name).then((res) => {
              if (res.data.code == '200') {
                toast('重命名成功！')
                this.$refs.imageRenamingRef.drawer = false
                this.getOneNewInfo(this.active)
              } else {
                toast('重命名失败', 'error')
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelForm() {
      this.$refs.imageRenamingRef.drawer = false;
    },
    cancel() {
      this.$refs.editNewsRef.drawer = false;
    },
    editNews(item) {
      this.newsInformation.id = item.id
      for (const key in this.newsInformation) {
        this.newsInformation[key] = item[key]
      }
      //修改新闻
      this.$refs.editNewsRef.drawer = true;
    },
    //点击切换active类名
    changeActive(item) {
      this.active = item.id;
      this.getOneNewInfo(item.id)
    },
    //上传图片
    uploadPictures() {
      //清空图片
      if (this.newList.length !== 0) {
        this.$refs.uploadPicturesRef.drawer = true;
      } else {
        toast('请先上传新闻数据,再上传图片！', 'warning')
      }
    },
    addNews() {
      this.ruleForm.createTime = this.getNewTime()
      this.$refs.drawerRef.drawer = true;
    },
    //新增新闻资讯
    createInfo() {
      let params = {
        content: this.ruleForm.content,
        createTime: this.ruleForm.createTime,
        title: this.ruleForm.title,
        orderId: this.ruleForm.orderId - 0
      }
      addNewsInformationInfo(params).then((res) => {
        if (res.data.code == '200') {
          toast('添加新闻成功！')
          this.$refs.drawerRef.drawer = false
          this.queryParams.title = ''
          this.getList()
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createInfo()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改按钮
    submitForm_1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            ...this.newsInformation,
          }
          editNewsInformationInfo(params).then((res) => {
            if (res.data.code == '200') {
              toast('修改新闻成功！')
              this.$refs.editNewsRef.drawer = false
              this.queryParams.title = ''
              this.getList()
              this.getOneNewInfo(this.active)
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.lookText {
  white-space: pre-wrap;
}

.el-empty {
  width: 100%;
  height: 100%;
  padding: 0;
}

.el-textarea {
  width: 80%;
}

/deep/ .el-textarea__inner {
  margin-left: 20px;
}

.el-input {
  width: 400px;
  margin-left: 20px;
  margin-right: 20px;
}

.upload-demo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgItem:hover {
  cursor: pointer;
}

.rename:hover {
  cursor: pointer;
}

.delete:hover {
  cursor: pointer;
}

.active {
  color: red !important;
}

.rename {
  width: 100%;
  height: 30px;
  font-size: 13px;
  text-align: center;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
}

.newList:hover .newListLeft {
  cursor: pointer;
  color: red !important;
}

.newList:hover .newListContainer {
  cursor: pointer;
  color: red !important;
}

.el-icon-edit,
.el-icon-delete:hover {
  cursor: pointer;
}

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-header {
  display: flex;
  align-items: center;
}

.containerButton {
  border-bottom: 1px solid #efefef;
}

.aside {
  position: relative;
  border-right: 1px solid #efefef;
}

.top {
  height: 100%;
  overflow-y: auto;
}


.newList {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .newListContainer {
    width: 25%;
    font-size: 13px;
    line-height: 70px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
  }

  .newListRight {
    width: 35%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .newListLeft {
    height: 100%;
    width: 40%;
    line-height: 70px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
  }
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
}</style>