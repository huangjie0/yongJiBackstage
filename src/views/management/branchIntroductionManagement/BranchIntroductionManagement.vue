<template>
  <div>
    <div class="navigationBar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分公司介绍管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div type="info" class="currentTime" id="time">当前时间：{{ time }}</div>
    </div>
    <el-card :style="{ height: h + 'px' }">
      <el-container>
        <el-header>
          <div>
            <el-button type="primary" @click="addContent()">新增</el-button>
            <el-input v-model="queryInfo" placeholder="请输入证书名称" clearable @clear="resetClear"></el-input>
            <el-button type="info" icon="el-icon-search" @click="searchForm()"></el-button>
            <el-button type="success" @click="resetForm()">重置</el-button>
            <el-dropdown @command="handleCommand">
              <el-button type="warning">
                一键导出<i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="EXCEL">导出EXCEL</el-dropdown-item>
                <el-dropdown-item command="PDF">导出PDF</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <!-- 表格区域 -->
          <div class="eTable">
            <el-table :data="postList" border style="width: 100%" stripe id="out-table" :height="690">
              <el-table-column type="index" label="序号" width="60" fixed>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="140" fixed>
              </el-table-column>
              <el-table-column prop="sonCompanyName" label="分公司名称" width="200" fixed>
              </el-table-column>
              <el-table-column label="公司预览图" width="200">
                <template slot-scope="scope">
                  <div class="previewImg" v-viewer>
                    <el-image style="width: 100px; height: 120px" :src="scope.row.sonCompanyPurl"></el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="orderId" label="排序" width="350">
              </el-table-column>
              <el-table-column prop="sonCompanyIntroduce" label="公司介绍" width="350" :show-overflow-tooltip='true'>
              </el-table-column>
              <el-table-column prop="sonCompanySite" label="公司地址" width='180'>
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="200" :show-overflow-tooltip='true'>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                  <!-- 编辑按钮 -->
                  <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditForm(scope.row)"
                    style="margin-right: 5px"></el-button>
                  <!-- 删除按钮 -->
                  <el-popconfirm title="这是一段内容确定删除吗？" @confirm="confirm(scope.row.id)" @cancel="cancel">
                    <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference"
                      style="margin-right: 5px"></el-button>
                  </el-popconfirm>
                  <el-tooltip content="设置" effect="dark" placement="top">
                    <el-button type="warning" size="mini" icon="el-icon-setting" @click="settings"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页部分 -->
          <div class="ePagination">
            <el-pagination background layout="total,prev, pager, next" :total="total"
              @current-change="handleCurrentChange" :current-page="currentPage">
            </el-pagination>
          </div>
          <!-- 新增新闻 -->
          <el-dialog title="新增" :visible.sync="dialogVisible" @closed="clearForm()" top="2%" width="65%">
            <span>
              <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker v-model="addForm.createTime" type="date" placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss" clearable>
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="公司名称" prop="sonCompanyName">
                  <el-input v-model="addForm.sonCompanyName" clearable></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="orderId">
                  <el-input v-model="addForm.orderId" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="sonCompanySite">
                  <el-input v-model="addForm.sonCompanySite" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司介绍" prop="sonCompanyIntroduce">
                    <div class="lookText">
                      <el-input type="textarea" v-model="addForm.sonCompanyIntroduce" clearable minlength="940"
                        maxlength="960" show-word-limit></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="addForm.remark" clearable></el-input>
                </el-form-item>
                <el-form-item label="图片上传" prop="upload">
                  <el-upload drag :action="upurl" :limit="1" :headers="headers" accept=".jpg, .png, .tif, .pdf, .jpeg"
                    ref="uploadClear" :on-success="handleAvatarSuccess" :on-error="handleAvatarError"
                    :before-remove="beforeRemove" :before-upload="beforeUpload" :multiple="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">请上传.jpg, .png, .tif, .pdf, .jpeg格式的图片</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCertificateForm()">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 编辑新闻 -->
          <el-dialog title="编辑" :visible.sync="dialogVisible_1" top="2%" @closed="clearForm_1()" width="65%">
            <span>
              <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker v-model="editForm.createTime" type="date" placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss" clearable>
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="公司名称" prop="sonCompanyName">
                  <el-input v-model="editForm.sonCompanyName" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="sonCompanySite">
                  <el-input v-model="editForm.sonCompanySite" clearable></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="orderId">
                  <el-input v-model="editForm.orderId" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司介绍" prop="sonCompanyIntroduce">
                  <div class="lookText">
                    <el-input type="textarea" v-model="editForm.sonCompanyIntroduce" clearable minlength="940" maxlength="960" show-word-limit></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="editForm.remark" clearable></el-input>
                </el-form-item>
                <el-form-item label="图片上传" prop="upload_1">
                  <el-upload drag :action="upurl" :limit="1" :headers="headers" accept=".jpg, .png, .tif, .pdf, .jpeg"
                    ref="uploadClear_1" :on-success="handleAvatarSuccess_1" :on-error="handleAvatarError"
                    :before-remove="beforeRemove_1" :before-upload="beforeUpload_1" :multiple="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">请上传.jpg, .png, .tif, .pdf, .jpeg格式的图片</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible_1 = false">取 消</el-button>
              <el-button type="primary" @click="editCommit()">确 定</el-button>
            </span>
          </el-dialog>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { compressionImage } from '@/until/documentProcessing'
import { height } from "@/until/height";
import { time } from '@/until/time'
import { basicURL } from '@/api/basicUrl'
import { getToken } from '@/until/useToken'
import { toast } from '@/until/toast';
import { exportExcel, getPdf } from '@/until/documentProcessing'
import { getBranchIntroductionInfo, addBranchIntroductionInfo, editBranchIntroductionInfo, deleteBranchIntroductionInfo } from '@/api/branchIntroduction'
export default {
  name: 'BranchIntroductionManagement',
  mixins: [height, time],
  created() {
    this.showIntroductionInfo('', 1, 10)
    this.addForm.createTime = this.getNewTime()
  },
  methods: {
    settings() {
      this.$confirm('此操作是否将其数据进行置顶操作?', '首页展示置顶前6条数据信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.$message({
          type: 'success',
          message: '置顶数据成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '已取消置顶数据'
        });
      });
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
    //图片上传之前压缩图片处理
    beforeUpload_1(file) {
      compressionImage(file, 0.8, 1500, 1500)
    },
    //图片上传之前压缩图片处理
    beforeUpload(file) {
      compressionImage(file, 0.8, 1500, 1500)
    },
    handleCommand(command) {
      switch (command) {
        case 'EXCEL':
          //导出excel表格
          exportExcel('分公司介绍')
          break;
        case 'PDF':
          getPdf('分公司介绍')
          break;
      }
    },
    openEditForm(row) {
      for (const key in row) {
        this.editForm[key] = row[key]
      }
      this.dialogVisible_1 = true
    },
    editCommit() {
      //对表单进行验证
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          editBranchIntroductionInfo(this.editForm).then((res) => {
            if (res.data.code !== 200) return toast('修改分公司失败！', 'error')
            //获取第一页数据
            this.dialogVisible_1 = false
            this.queryInfo = ''
            toast('修改分公司成功', 'success')
            this.loading = true
            this.showIntroductionInfo('', this.currentPage, 10)
          })
        } else {
          return false;
        }
      });
    },
    //编辑证书关闭时清空数据
    clearForm_1() {
      this.$refs.editFormRef.resetFields()
      this.editForm.remark = ''
      //清空图片
      this.$refs.uploadClear_1.clearFiles()
      //给验证加上验证
      this.editFormRules.upload_1 = [{
        required: true, message: "请上传图片", trigger: "change"
      }]
    },
    //删除
    confirm(id) {
      this.loading = true
      deleteBranchIntroductionInfo(id).then((res) => {
        if (res.data.code !== 200) return toast('删除失败', 'error')
        this.showIntroductionInfo('', this.currentPage, 10)
        toast('删除成功')
      }).finally(() => {
        this.loading = false
      })
    },
    //重置表单
    resetForm() {
      this.loading = true
      this.currentPage = 1
      this.queryInfo = ''
      this.showIntroductionInfo('', this.currentPage, 10)
    },
    //搜索
    searchForm() {
      this.currentPage = 1
      this.loading = true
      this.showIntroductionInfo(this.queryInfo, 1, 10)
    },
    resetClear() {
      this.loading = true
      this.currentPage = 1
      this.showIntroductionInfo('', this.currentPage, 10)
    },
    //查询列表的数据
    showIntroductionInfo(name = '', pageNum, pageSize) {
      getBranchIntroductionInfo(name, pageNum, pageSize).then(res => {
        if (res.data.code !== 200) return toast('获取列表数据失败', 'error')
        this.postList = res.data.result.list.map(item => {
          item.sonCompanyPurl = basicURL() + '/' + item.sonCompanyPurl
          return item
        })
        this.total = res.data.result.total
        if (res.data.result.list.length == 0 && res.data.result.total !== 0) {
          this.showIntroductionInfo(this.name, this.currentPage - 1, 10)
          this.currentPage--
        }
      }).finally(() => {
        this.loading = false
      })
    },
    //页码改变时
    handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      this.showIntroductionInfo('', val, 10)
    },
    //添加证书表单
    addCertificateForm() {
      //对表单进行验证
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          addBranchIntroductionInfo(this.addForm).then((res) => {
            if (res.data.code !== 200) return toast('添加新闻失败！', 'error')
            //获取第一页数据
            this.dialogVisible = false
            this.queryInfo = ''
            toast('添加新闻成功', 'success')
            this.loading = true
            this.showIntroductionInfo('', this.currentPage, 10)
          })
        } else {
          return false;
        }
      });
    },
    clearForm() {
      this.$refs.addFormRef.resetFields();
      this.addForm.remark = ''
      //清空图片
      this.$refs.uploadClear.clearFiles()
      //清除上一次的路劲问题
      this.addForm.sonCompanyPurl = ''
      //给验证加上验证
      this.addFormRules.upload = [{
        required: true, message: "请上传图片", trigger: "change"
      }]
    },
    //上传成功回调函数
    handleAvatarSuccess(res) {
      if (res.code !== 200) return
      toast('图片上传成功！', 'success')
      //向form表单存数据
      this.addForm.sonCompanyPurl = res.result.fileAddr
      this.editForm.sonCompanyPurl = res.result.fileAddr
      this.$refs.addFormRef.clearValidate('upload')
      this.addFormRules.upload = ''
    },
    //上传成功回调函数
    handleAvatarSuccess_1(res) {
      if (res.code !== 200) return
      toast('图片上传成功！', 'success')
      //向form表单存数据
      this.addForm.sonCompanyPurl = res.result.fileAddr
      this.editForm.sonCompanyPurl = res.result.fileAddr
      this.$refs.editFormRef.clearValidate('upload_1')
      this.editFormRules.upload_1 = ''
    },
    //图片上传失败的函数
    handleAvatarError() {
      toast('图片上传失败！', 'error')
    },
    beforeRemove(file) {
      //给验证加上验证
      this.addFormRules.upload = [{
        required: true, message: "请上传图片", trigger: "change"
      }]
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeRemove_1(file) {
      //给验证加上验证
      this.editFormRules.upload_1 = [{
        required: true, message: "请上传图片", trigger: "change"
      }]
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    cancel() {
      toast('取消删除', 'error')
    },
    addContent() {
      this.dialogVisible = true;
    },
  },
  data() {
    var validate = (rule, value, callback) => {
      if(value.length < 940){
        return callback(new Error('字数不能少于940'))
      }else{
        callback()
      }
    };
    return {
      total: '' - 0,
      currentPage: "" - 0,
      headers: {
        token: getToken()
      },
      loading: false,
      //图片上传地址
      upurl: basicURL() + '/official/file/uploadFile',
      editForm: {
        createTime: "",
        sonCompanyName: "",
        sonCompanyIntroduce: "",
        remark: '',
        sonCompanySite: ''
      },
      addFormRules: {
        upload: [{
          required: true, message: "请上传图片", trigger: "change"
        }],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" },
        ],
        sonCompanyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        sonCompanyIntroduce: [
          { validator: validate, trigger: 'blur' },
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        sonCompanySite: [
          { required: true, message: "请输入公司工作地", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "请输入排序", trigger: "blur" },
        ]
      },
      editFormRules: {
        upload_1: [{
          required: true, message: "请上传图片", trigger: "change"
        }],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" },
        ],
        sonCompanyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        sonCompanyIntroduce: [
          { validator: validate, trigger: 'blur' },
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        sonCompanySite: [
          { required: true, message: "请输入公司工作地", trigger: "blur" },
        ],
        orderId: [
          { required: true, message: "请输入排序", trigger: "blur" },
        ]
      },
      addForm: {
        createTime: "",
        sonCompanyName: "",
        sonCompanyIntroduce: "",
        remark: "",
        sonCompanyPurl: "",
        sonCompanySite: '',
        orderId: 0
      },
      queryInfo: "",
      dialogVisible: false,
      dialogVisible_1: false,
      postList: [],
    };
  },
}
</script>

<style lang="less" scoped>
.lookText{
  white-space: pre-wrap;
}
.el-textarea {
  width: 80%;
}

/deep/ .el-upload-dragger {
  margin-left: 20px;
}

/deep/ .el-textarea__inner {
  margin-left: 20px;
}

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.el-input {
  width: 400px;
  margin-left: 20px;
  margin-right: 20px;
}

.previewImg {
  width: 100px;
  height: 120px;
  margin: 0 auto;
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
</style>