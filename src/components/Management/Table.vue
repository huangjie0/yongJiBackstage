<template>
  <div>
    <!-- 表格区域 -->
    <div class="eTable">
      <el-table :data="postList" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="40">
        </el-table-column>
        <el-table-column prop="time" label="创建时间" width="100">
        </el-table-column>
        <el-table-column prop="certificateName" label="证书名称" width="200">
        </el-table-column>
        <el-table-column prop="type" label="证书类型" width="50">
        </el-table-column>
        <el-table-column prop="preview" label="证书预览图" width="200">
          <template slot-scope="scope">
            <div class="previewImg"  v-viewer>
              <img :src="scope.row.preview">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="introduce" label="证书介绍" width="200">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editForm()"
              style="margin-right: 5px"
            ></el-button>
            <!-- 删除按钮 -->
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="confirm"
              @cancel="cancel"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                slot="reference"
                style="margin-right: 5px"
              ></el-button>
            </el-popconfirm>
            <el-tooltip content="设置" effect="dark" placement="top">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      postList: [
        {
          time: "2022/12/24",
          certificateName: "永基机械证书",
          type: 1,
          preview: "https://img2.baidu.com/it/u=961799107,3517680776&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/23",
          certificateName: "普通话证书",
          type: 2,
          preview: "https://img2.baidu.com/it/u=94187456,36044827&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/24",
          certificateName: "英语4级",
          type: 1,
          preview: "https://up.36992.com/pic/5c/ca/06/5cca0607bf826618f95afe31720f5f54.jpg",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/24",
          certificateName: "英语6级",
          type: 1,
          preview: "https://www.szbubu.com/wp-content/uploads/2021/10/1633912621-c04a3aebe1cdeee.jpg",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/24",
          certificateName: "计算机1级",
          type: 1,
          preview: "https://img2.baidu.com/it/u=961799107,3517680776&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/24",
          certificateName: "计算机2及",
          type: 2,
          preview: "https://img2.baidu.com/it/u=961799107,3517680776&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/24",
          certificateName: "口语1级",
          type: 1,
          preview: "https://img2.baidu.com/it/u=961799107,3517680776&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
        {
          time: "2022/12/24",
          certificateName: "口语2级",
          type: 1,
          preview: "https://img2.baidu.com/it/u=961799107,3517680776&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          introduce: "u古典诗歌梵蒂冈法国规划",
          remarks: "无",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.previewImg{
  width: 100px;
  height: 120px;
  margin:0 auto;
  img{
    width: 100px;
    height: 120px;
  }
}
.el-table {
  font-size: 12px;
  // width: 100%;
  // height: 100%;
}
</style>