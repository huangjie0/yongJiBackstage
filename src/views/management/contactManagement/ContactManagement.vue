<template>
  <div>
    <div class="navigationBar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>联系人管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div type="info" class="currentTime" id="time">当前时间：{{ time }}</div>
    </div>
    <!-- 中间卡片区域 -->
    <el-card :style="{ height: h + 'px' }">
      <el-row>
        <el-col :span="7">
          <el-input v-model="name" placeholder="请输入联系人" clearable @clear="clearForm()"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="info" icon="el-icon-search" @click="searchPerson()"></el-button>
          <el-button type="success" @click="resetForm()">重置</el-button>
          <el-button type="primary" @click="addContactPerson()">添加联系人</el-button>
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
        <el-table :data="contactList" border style="width: 100%" stripe v-loading="loading" id="out-table" :height="690">
          <el-table-column type="index" label="序号" width="60" fixed>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150" fixed>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="90" fixed>
          </el-table-column>
          <el-table-column prop="workId" label="工号" width="140">
          </el-table-column>
          <el-table-column prop="orderId" label="排序" width="140">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="180">
          </el-table-column>
          <el-table-column prop="idnum" label="身份证号" width="180">
          </el-table-column>
          <el-table-column prop="job" label="职务" width="300" :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="350" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editForm(scope.row)"
                style="margin-right: 5px"></el-button>
              <!-- 删除按钮 -->
              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="confirm(scope.row.linkmanId)" @cancel="cancel">
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
    <!-- 添加联系人的弹框 -->
    <el-dialog title="添加联系人" width="65%" :visible.sync="dialogVisible" @close="addDialogClosed">
      <span>
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
          <el-form-item label="创建时间">
            <el-date-picker v-model="addForm.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"
              clearable>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderId">
            <el-input v-model="addForm.orderId" clearable type="number"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="workId">
            <el-input v-model="addForm.workId" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idnum">
            <el-input v-model="addForm.idnum" clearable></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="job">
            <el-input v-model="addForm.job" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm.remark" clearable></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFormRef')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑联系人的弹框 -->
    <el-dialog title="修改联系人信息" :visible.sync="dialogVisible_1" width="65%">
      <span>
        <el-form :model="editFormData" :rules="addFormRules" ref="editFormRef" label-width="100px">
          <el-form-item label="创建时间">
            <el-date-picker v-model="editFormData.createTime" type="date" placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss" clearable>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editFormData.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderId">
            <el-input v-model="editFormData.orderId" clearable type="number"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="workId">
            <el-input v-model="editFormData.workId" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="editFormData.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idnum">
            <el-input v-model="editFormData.idnum" clearable></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="job">
            <el-input v-model="editFormData.job" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
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
import { toast } from '@/until/toast'
import { time } from '@/until/time'
import { exportExcel, getPdf } from '@/until/documentProcessing'
import { getUserInfo, addUserInfo, editUserInfo, deleteUserInfo } from '@/api/contactManagement'
export default {
  name: "ContactManagement",
  data() {
    return {
      total: "" - 0,
      newPage: '' - 0,
      h: "",
      dialogVisible: false,
      dialogVisible_1: false,
      loading: false,
      editFormData: {
        name: "",
        createTime: "",
        workId: "",
        phone: "",
        idnum: "",
        job: "",
        remark: "",
        linkmanId: "",
        orderId:0
      },
      addForm: {
        name: "",
        createTime: "",
        workId: "",
        phone: "",
        idnum: "",
        job: "",
        remark: "",
        orderId:0
      },
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        workId: [{ required: true, message: "请输入工号", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        idnum: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        job: [{ required: true, message: "请输入职务", trigger: "blur" }],
        orderId: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      name: "",
      // 联系人列表数据
      contactList: [],
    };
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
    handleCommand(command) {
      switch (command) {
        case 'EXCEL':
          //导出excel表格
          exportExcel('联系人管理')
          break;
        case 'PDF':
          getPdf('联系人管理')
          break;
      }
    },
    clearForm() {
      this.newPage = 1
      this.getInfo('', 1, 10)
    },
    resetForm() {
      this.name = ''
      this.newPage = 1
      this.getInfo('', this.newPage, 10)
    },
    //确定编辑
    editFormBtn() {
      editUserInfo(this.editFormData).then(res => {
        if (res.data.code == 200) {
          toast('更新成功', 'success')
          this.getInfo('', this.newPage, 10)
          this.dialogVisible_1 = false
        }
      })
    },
    //搜索
    searchPerson() {
      this.newPage = 1
      this.getInfo(this.name, this.newPage, 10)
    },
    //换页查询
    handleCurrentChange(newPage) {
      this.newPage = newPage
      this.getInfo(this.name, newPage, 10)
    },
    //查询加上初始化数据
    getInfo(name = '', pageNum, pageSize) {
      this.loading = true
      getUserInfo(name, pageNum, pageSize).then((res => {
        if (res.status == 200) {
          this.loading = false
          this.total = res.data.result.total
          this.contactList = res.data.result.list
          if (res.data.result.list.length == 0 && res.data.result.total !== 0) {
            this.getInfo('', this.newPage - 1, 10)
            this.newPage--
          }
        }
      })).finally(() => {
        this.loading = false
      })
    },
    confirm(id) {
      deleteUserInfo(id).then(res => {
        if (res.data.code == 200) {
          toast('删除成功', 'success')
          this.getInfo('', this.newPage, 10)
        } else {
          toast('删除失败', 'error')
        }
      }).catch(() => {
        toast('删除失败', 'error')
      })
    },
    cancel() {
      toast('取消删除', 'success')
    },
    //增加联系人
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUserInfo(this.addForm).then((res) => {
            if (res.data.code == 200) {
              toast('添加成功', 'success')
              this.name = ''
              this.getInfo('', this.newPage, 10)
              this.dialogVisible = false
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addContactPerson() {
      this.addForm.createTime = this.getNewTime()
      this.dialogVisible = true;
    },
    addDialogClosed() {
      //关闭弹框清空里面数据
      this.$refs.addFormRef.resetFields();
      this.addForm.createTime = ''
    },
    // 点击编辑时候的函数
    editForm(row) {
      for (let key in this.editFormData) {
        this.editFormData[key] = row[key]
      }
      this.dialogVisible_1 = true;
    },
  },
  created() {
    let windowHeight = window.innerHeight || document.body.clientHeight;
    const h = windowHeight - 60 - 12 - 60;
    this.h = h;
    this.getInfo('', 1, 10)
    this.addForm.createTime = this.getNewTime()
  },
  mixins: [time],
};
</script>

<style lang="less" scoped>
/deep/ label {
  display: inline-block;
  width: 100px;
  text-align: right;
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

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>