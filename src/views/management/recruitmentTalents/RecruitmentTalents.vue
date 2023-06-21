<template>
  <div>
    <!-- 头部导航栏区域 -->
    <div class="navigationBar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人才招聘管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div type="info" class="currentTime" id="time">当前时间：{{ time }}</div>
    </div>
    <!-- 中间卡片视图区域 -->
    <el-card :style="{ height: h + 'px' }">
      <el-row>
        <el-col :span="7">
          <el-input v-model="jobName" placeholder="请输入招聘岗位" clearable @clear="clearForm()"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="info" icon="el-icon-search" @click="searchJob()"></el-button>
          <el-button type="success" @click="resetForm()">重置</el-button>
          <el-button type="primary" @click="addPost()">添加岗位</el-button>
          <el-dropdown @command="handleCommand">
            <el-button type="warning">
              一键导出<i class="el-icon-caret-bottom"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="EXCEL">导出EXCEL</el-dropdown-item>
              <el-dropdown-item command="PDF">导出PDF</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <div class="eTable">
        <el-table :data="postList" border style="width: 100%" stripe v-loading="loading" id="out-table" :height="690">
          <el-table-column type="index" label="序号" width="60" fixed>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150" fixed>
          </el-table-column>
          <el-table-column prop="jobName" label="岗位名称" width="130">
          </el-table-column>
          <el-table-column prop="orderId" label="排序" width="100">
          </el-table-column>
          <el-table-column prop="requestNum" label="需求人数" width="100">
          </el-table-column>
          <el-table-column prop="recruitUserName" label="招聘者" width="100">
          </el-table-column>
          <el-table-column prop="recruitUserPhone" label="联系方式" width="180">
          </el-table-column>
          <el-table-column prop="recruitSite" label="工作地" width="120">
          </el-table-column>
          <el-table-column prop="jobRequest" label="岗位要求" width="300" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="xinZi" label="薪资待遇" width="300"></el-table-column>
          <el-table-column prop="fuLi" label="福利待遇" width="300" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="remark" label="备注" width="300" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editForm(scope.row)"
                style="margin-right: 5px"></el-button>
              <!-- 删除按钮 -->
              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="confirm(scope.row.id)" @cancel="cancel">
                <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference"
                  style="margin-right: 5px"></el-button>
              </el-popconfirm>
              <el-tooltip content="设置" effect="dark" placement="right">
                <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="ePagination">
        <el-pagination background layout="total,prev, pager, next" :total="total" @current-change="handleCurrentChange"
          :current-page="newPage">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加岗位的弹框 -->
    <el-dialog title="添加岗位" top="2%" width="65%" :visible.sync="dialogVisible" @close="addDialogClosed" :close-on-click-modal="false">
      <span>
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker v-model="addForm.createTime" type="date" placeholder="选择日期" clearable
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="岗位名称" prop="jobName">
            <el-input v-model="addForm.jobName" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderId">
            <el-input v-model="addForm.orderId" clearable type="number"></el-input>
          </el-form-item>
          <el-form-item label="需求人数" prop="requestNum">
            <el-input v-model.number="addForm.requestNum" clearable></el-input>
          </el-form-item>
          <el-form-item label="薪资待遇" prop="xinZi">
            <el-input v-model="addForm.xinZi" clearable></el-input>
          </el-form-item>
          <el-form-item label="福利待遇" prop="fuLi">
            <el-input v-model="addForm.fuLi" clearable></el-input>
          </el-form-item>
          <el-form-item label="岗位要求" prop="jobRequest">
            <el-input v-model="addForm.jobRequest" clearable type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="招聘者" prop="recruitUserName">
            <el-input v-model="addForm.recruitUserName" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="recruitUserPhone">
            <el-input v-model="addForm.recruitUserPhone" clearable></el-input>
          </el-form-item>
          <el-form-item label="工作地" prop="recruitSite">
            <el-select v-model="addForm.recruitSite" placeholder="请输入工作地">
              <el-option :label="item.label" :value="item.value" v-for="(item, index) in AllrecruitSite"
                :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addForm.remark" clearable type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJobForm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑岗位的弹框 -->
    <el-dialog title="修改岗位信息" top="2%" :visible.sync="dialogVisible_1" width="65%" @close="editDialogClosed" :close-on-click-modal="false">
      <span>
        <el-form :model="editFormData" label-width="100px" ref="editFormRef" :rules="addFormRules">
          <el-form-item label="创建时间">
            <el-date-picker v-model="editFormData.createTime" type="date" placeholder="选择日期" prop="createTime" clearable
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="招聘岗位" prop="jobName">
            <el-input v-model="editFormData.jobName" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderId">
            <el-input v-model="editFormData.orderId" clearable type="number"></el-input>
          </el-form-item>
          <el-form-item label="需求人数" prop="requestNum">
            <el-input v-model="editFormData.requestNum" clearable></el-input>
          </el-form-item>
          <el-form-item label="岗位要求" prop="jobRequest">
            <el-input v-model="editFormData.jobRequest" clearable type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="薪资待遇" prop="xinZi">
            <el-input v-model="editFormData.xinZi" clearable></el-input>
          </el-form-item>
          <el-form-item label="福利待遇" prop="fuLi">
            <el-input v-model="editFormData.fuLi" clearable></el-input>
          </el-form-item>
          <el-form-item label="招聘者" prop="recruitUserName">
            <el-input v-model="editFormData.recruitUserName" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="recruitUserPhone">
            <el-input v-model="editFormData.recruitUserPhone" clearable></el-input>
          </el-form-item>
          <el-form-item label="工作地" prop="recruitSite">
            <el-select v-model="editFormData.recruitSite" placeholder="请输入工作地">
              <el-option :label="item.label" :value="item.value" v-for="(item, index) in AllrecruitSite"
                :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editFormData.remark" clearable></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false">取 消</el-button>
        <el-button type="primary" @click="editFormBtn()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { height } from '@/until/height';
import { time } from '@/until/time'
import { toast } from '@/until/toast';
import { getUserInfo, addUserInfo, deleteUserInfo, editUserInfo } from '@/api/recruitmentTalents';
import { getBranchIntroductionInfo } from '@/api/branchIntroduction'
import { exportExcel, getPdf } from '@/until/documentProcessing'
export default {
  name: "RecruitmentTalents",
  mixins: [height, time],
  created() {
    //查询全部内容
    this.getInfo(1)
    this.addForm.createTime = this.getNewTime()
    this.getAdress()
  },
  methods: {
    getAdress() {
      getBranchIntroductionInfo('', 1, 10).then((res) => {
        if (res.data.code == '200') {
          let addressList = []
          res.data.result.list.map((item) => {
            let address = {}
            address.label = item.sonCompanySite
            address.value = item.sonCompanySite
            addressList.push(address)
          })
          this.AllrecruitSite = addressList
        }
      })
    },
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
    handleCommand(command) {
      switch (command) {
        case 'EXCEL':
          //导出excel表格
          exportExcel('人才招聘管理')
          break;
        case 'PDF':
          getPdf('人才招聘管理')
          break;
      }
    },
    clearForm() {
      this.newPage = 1
      this.getInfo(1)
    },
    resetForm() {
      this.jobName = ''
      this.newPage = 1
      this.getInfo(this.newPage)
    },
    editFormBtn() {
      this.$refs.editFormRef.validate((val) => {
        if (val) {
          editUserInfo(this.editFormData).then((res) => {
            if (res.data.code == 200) {
              toast('修改成功', 'success')
              this.dialogVisible_1 = false
              this.jobName = ''
              this.getInfo(this.newPage)
            }else{
              toast('修改失败','error')
            }
          })
        }
      })
    },
    searchJob() {
      this.newPage = 1
      this.getInfo(this.newPage, this.jobName)
    },
    //删除确定回调函数
    confirm(id) {
      deleteUserInfo(id).then(res => {
        if (res.data.code == 200) {
          toast('删除成功', 'success')
        }
        this.getInfo(this.newPage)
      })
    },
    cancel() {
      toast('取消删除', 'error')
    },
    //当用户点击编辑按钮时候的弹框
    editForm(item) {
      for (let key in this.editFormData) {
        this.editFormData[key] = item[key]
      }
      this.dialogVisible_1 = true;
    },
    addDialogClosed() {
      // 监听对话框关闭时候的函数，将数据重置清空操作
      this.$refs.addFormRef.resetFields();
      this.addForm.remark = "";
      this.addForm.createTime = "";
    },
    editDialogClosed(){
      this.$nextTick(()=>{
        this.$refs.editFormRef.clearValidate();
      })
    },  
    //换页查询
    handleCurrentChange(newPage) {
      this.newPage = newPage
      this.getInfo(this.newPage, this.jobName)
    },
    //添加岗位
    addPost() {
      this.addForm.createTime = this.getNewTime()
      this.dialogVisible = true;
    },
    //获取用户
    getInfo(pageNum, jobName = '') {
      this.loading = true
      getUserInfo(pageNum, jobName).then(res => {
        if (res.status == 200) {
          this.total = res.data.result.total
          this.postList = res.data.result.list
          if (res.data.result.list.length == 0 && res.data.result.total !== 0) {
            this.getInfo(this.newPage - 1)
            this.newPage--
          }
        }
      }).finally(() => {
        this.loading = false
      })
    },
    //添加岗位确定
    addJobForm() {
      this.$refs.addFormRef.validate((val) => {
        if (val) {
          addUserInfo(this.addForm).then(res => {
            if (res.data.code == 200) {
              toast('添加成功', 'success')
              this.jobName = ''
              this.dialogVisible = false
              this.getInfo(this.newPage)
            } else {
              toast('添加失败', 'error')
            }
          })
        }
      })
    }
  },
  data() {
    return {
      h: "",
      //默认是遮罩层关闭
      loading: false,
      // 总页数
      total: "" - 0,
      addForm: {
        orderId: 0,
        // 创建时间
        createTime: "",
        //岗位名称
        jobName: "",
        //需求人数
        requestNum: "",
        //招聘要求
        jobRequest: "",
        //备注信息
        remark: "",
        recruitUserName: '谷小姐',
        recruitUserPhone: '18912905510',
        recruitSite: '',
        xinZi:'',
        fuLi:''
      },
      AllrecruitSite: [],
      // 表单验证规则对象
      addFormRules: {
        jobName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" },
        ],
        requestNum: [
          { required: true, message: "请输入需求人数", trigger: "blur" },
        ],
        jobRequest: [
          { required: true, message: "请输入招聘要求", trigger: "blur" },
        ],
        recruitUserName: [
          { required: true, message: "请输入招聘者", trigger: "blur" },
        ],
        recruitUserPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        recruitSite: [
          { required: true, message: "请输入工作地", trigger: "blur" },
        ],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" },
        ],
        xinZi: [
          { required: true, message: "请输入薪资待遇", trigger: "blur" },
        ],
        fuLi: [
          { required: true, message: "请输入福利待遇", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "请输入排序", trigger: "blur" },
        ],
      },
      postList: [],
      dialogVisible: false,
      dialogVisible_1: false,
      editFormData: {
        orderId: 0,
        createTime: "",
        jobName: "",
        requestNum: "",
        jobRequest: "",
        remark: "",
        id: "" - 0,
        recruitUserName: '',
        recruitUserPhone: '',
        recruitSite: '',
        xinZi:'',
        fuLi:''
      },
      // 查询信息对象
      jobName: "",
      newPage: "" - 0
    };
  },
};
</script>

<style scoped lang="less">
.el-dropdown {
  margin-left: 10px;
}

.ePagination {
  position: absolute;
  left: 10px;
  bottom: 5px;
}

.el-card {
  position: relative;
}

.eTable {
  position: absolute;
  top: 70px;
  left: 20px;
  right: 20px;
  bottom: 50px;
  overflow-y: auto;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style> 