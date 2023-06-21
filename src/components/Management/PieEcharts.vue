<template>
  <div>
    <div id="pieStatement"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PieEcharts",
  props:['dataInfo'],
  data() {
    return {
      option: {
        title: {
          text: "总数据报表统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "总数据报表",
            type: "pie",
            radius: "50%",
            data: [
              { value: 0, name: "人才职位总数" },
              { value: 0, name: "热点新闻总数" },
              { value: 0, name: "分公司总数" },
              { value: 0, name: "联系人总数" },
              {value:  0, name: '总产品数'},
              { value: 0, name: "总工程数" },
              { value: 0, name: "总证书数" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  beforeDestroy(){
    if(this.myChart) echarts.dispose(this.myChart)
  },
  mounted(){
    var chartDom = document.getElementById('pieStatement');
    var myChart = echarts.init(chartDom);
    setTimeout(()=>{
      const {data} = this.option.series[0]
      data[0].value = this.dataInfo.recruitCount
      data[1].value = this.dataInfo.newsCount
      data[2].value = this.dataInfo.sonCompanyCount
      data[3].value = this.dataInfo.linkmansCount
      data[4].value = this.dataInfo.productCount
      data[5].value = this.dataInfo.projectCount
      data[6].value = this.dataInfo.qulifucationCount
       myChart.setOption(this.option);
    },200)
  },
};
</script>

<style lang="less" scoped>
#pieStatement {
  height: 220px;
}
</style>