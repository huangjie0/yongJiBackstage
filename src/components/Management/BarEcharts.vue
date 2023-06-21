<template>
  <div>
      <div id="statementCard">
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name:'BarEcharts',
  props:['dataInfo'],
  data () {
    return {
      option:{
        title: {
          text: '总数据报表统计'
        },
        legend: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['人才职位总数', '热点新闻总数', '分公司总数', '联系人总数', '总产品数', '总工程数', '总证书数']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            name:'总数量'
          }
        ]
      }
    }
  },
  mounted(){
    var chartDom = document.getElementById('statementCard')
    var myChart = echarts.init(chartDom);
    setTimeout(()=>{
      const newArr = []
      const {series} = this.option
      newArr.push(this.dataInfo.recruitCount)
      newArr.push(this.dataInfo.newsCount)
      newArr.push(this.dataInfo.sonCompanyCount)
      newArr.push(this.dataInfo.linkmansCount)
      newArr.push(this.dataInfo.productCount)
      newArr.push(this.dataInfo.projectCount)
      newArr.push(this.dataInfo.qulifucationCount)
      series[0].data = newArr
      myChart.setOption(this.option);
    },200)
  },
  beforeDestroy(){
    if(this.myChart) echarts.dispose(this.myChart)
  }
}
</script>

<style scoped lang="less">
#statementCard{
  height: 220px;
}
</style>