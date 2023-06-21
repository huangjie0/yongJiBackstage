<template>
  <div>
      <div :style="{ height: h + 'px' }">
        <div class="navigationBar">
          <!-- 头部导航栏区域 -->
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/management' }"
              >首页</el-breadcrumb-item
            >
          </el-breadcrumb>
          <div type="info" class="currentTime" id="time">当前时间：{{ time }}</div>
      </div>
      <!-- 概述 -->
      <div>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-card class="Fcard" shadow="hover">
              <div class="FcardItem">
                <div class="FcardIcon">
                  <i class="el-icon-document"></i>
                </div>
                <div class="FcardCount">
                  <div class="count">
                    <span style="font-size: 30px">
                      <CountTo :vaule="recruitCount" />
                    </span>
                  </div>
                  <div class="countTitle">人才招聘总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="Scard" shadow="hover">
              <div class="ScardItem">
                <div class="ScardIcon">
                  <i class="el-icon-search"></i>
                </div>
                <div class="ScardCount">
                  <div class="count">
                    <span style="font-size: 30px">
                      <CountTo :vaule="newsCount" />
                    </span>
                  </div>
                  <div class="countTitle">热点新闻总条数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="Tcard" shadow="hover">
              <div class="TcardItem">
                <div class="TcardIcon">
                  <i class="el-icon-s-flag"></i>
                </div>
                <div class="TcardCount">
                  <div class="count">
                    <span style="font-size: 30px">
                      <CountTo :vaule="sonCompanyCount" />
                    </span>
                  </div>
                  <div class="countTitle">分公司总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 基本统计 -->
      <div class="basicStatistics">
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="(item, index) in statisticalList"
            :key="index"
          >
            <el-card shadow="hover">
              <template #header>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                  "
                >
                  <span>{{ item.smallTitle }}</span>
                  <el-tag :type="item.unitColor" effect="plain">
                    {{ item.time }}
                  </el-tag>
                </div>
              </template>
              <!-- card body -->
              <span style="font-size: 30px; font-weight: bold">
                {{ item.count }}
              </span>
              <el-divider />
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 13px;
                  color: gray;
                "
              >
                <span>{{ item.smallTitle_1 }}</span>
                <span>{{ item.number }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- echarts报表 -->
      <div class="statement">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover">
              <BarEcharts :dataInfo="dataInfo"/>
            </el-card>
          </el-col>          
          <el-col :span="12">
            <el-card shadow="hover">
              <PieEcharts :dataInfo="dataInfo"/>
            </el-card>
          </el-col>          
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {init} from '@/api/backgroundHomePage'
import CountTo from "@/components/Management/CountTo.vue";
import BarEcharts from '@/components/Management/BarEcharts.vue'
import PieEcharts from "@/components/Management/PieEcharts.vue";
import { time } from '@/until/time'
export default {
  name: "BackgroundHomePage",
  data() {
    return {
      h: "",
      statisticalList: [
        {
          smallTitle: "联系人管理",
          time: "年",
          count: 0,
          smallTitle_1: "总联系人数量",
          number: 0,
        },
        {
          smallTitle: "产品介绍",
          time: "年",
          count: 0,
          smallTitle_1: "总产品数量",
          number: 0,
        },
        {
          smallTitle: "工程介绍",
          time: "年",
          count: 0,
          smallTitle_1: "总工程数量",
          number: 0,
        },
        {
          smallTitle: "资质认证",
          time: "年",
          count: 0,
          smallTitle_1: "总证书数量",
          number: 0,
        },
      ],
      //新闻总数
      newsCount: 0,
      //分公司总数
      sonCompanyCount:0,
      //人才招聘总数
      recruitCount:0,
      dataInfo:{},
    };
  },
  components: {
    CountTo,
    BarEcharts,
    PieEcharts
  },
  methods:{
    getInit(){
      init().then(res=>{
        if(res.data.code !== 200) return
        this.newsCount = res.data.result.newsCount
        this.sonCompanyCount = res.data.result.sonCompanyCount
        this.recruitCount = res.data.result.recruitCount
        //修改里面count和number值
        //联系人
        this.statisticalList[0].count = res.data.result.linkmansCount
        this.statisticalList[0].number = res.data.result.linkmansCount
        //产品介绍
        this.statisticalList[1].count = res.data.result.productCount
        this.statisticalList[1].number = res.data.result.productCount
        //工程介绍
        this.statisticalList[2].count = res.data.result.projectCount
        this.statisticalList[2].number = res.data.result.projectCount
        //资质认证
        this.statisticalList[3].count = res.data.result.qulifucationCount
        this.statisticalList[3].number = res.data.result.qulifucationCount
        // console.log(res.data.result);
        this.dataInfo = res.data.result
      })
    }
  },
  created() {
    let windowHeight = window.innerHeight || document.body.clientHeight;
    let h = windowHeight - 60 - 45;
    this.h = h;
    this.getInit()
  },
  mixins:[time]
};
</script>

<style scoped lang="less">
.statement{
  margin-top: 15px;
  height: 40%;
}
.statement{
  margin-top: 15px;
}
.basicStatistics {
  height: 34%;
  margin-top: 15px;
}
.el-breadcrumb {
  font-size: 12px;
  margin-bottom: 15px;
}
.el-breadcrumb__inner .is-link {
  font-weight: 0;
}
.Fcard {
  height: 10%;
  background-image: linear-gradient(to right, #fd908e, #fc5a52);
  .FcardItem {
    display: flex;
    align-items: center;
    .FcardIcon {
      font-size: 50px;
      color: white;
      margin-right: 50px;
    }
    .FcardCount {
      display: flex;
      flex-direction: column;
      margin-right: 50px;
      .count {
        color: white;
      }
      .countTitle {
        color: white;
      }
    }
  }
}
.Scard {
  height: 10%;
  background-image: linear-gradient(to right, #7bb5fc, #3b78ea);
  .ScardItem {
    display: flex;
    align-items: center;
    .ScardIcon {
      font-size: 50px;
      color: white;
      margin-right: 50px;
    }
    .ScardCount {
      display: flex;
      flex-direction: column;
      margin-right: 50px;
      .count {
        color: white;
      }
      .countTitle {
        color: white;
      }
    }
  }
}
.Tcard {
  height: 10%;
  background-image: linear-gradient(to right, #c3b4eb, #8f6cf6);
  .TcardItem {
    display: flex;
    align-items: center;
    .TcardIcon {
      font-size: 50px;
      color: white;
      margin-right: 50px;
    }
    .TcardCount {
      display: flex;
      flex-direction: column;
      margin-right: 50px;
      .count {
        color: white;
      }
      .countTitle {
        color: white;
      }
    }
  }
}
</style>